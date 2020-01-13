package com.example.sihdemo1;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import android.app.NotificationChannel;
import android.content.ContentResolver;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.MimeTypeMap;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.StorageTask;
import com.google.firebase.storage.UploadTask;

import java.util.HashMap;

public class MainActivity extends AppCompatActivity {
    Button ch,up;
    ImageView img;
    EditText username,location,complaint;
    StorageReference mStorageRef;
    DatabaseReference myRef;
    Datas datas;
    private StorageTask uploadTask;
    public Uri imguri;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mStorageRef=FirebaseStorage.getInstance().getReference("Images");
        myRef= FirebaseDatabase.getInstance().getReference().child("Datas");
        ch=(Button)findViewById(R.id.button00);
        up=(Button)findViewById(R.id.button0);
        img=(ImageView)findViewById(R.id.image1);
        username=(EditText)findViewById(R.id.username);
        location=(EditText)findViewById(R.id.location);
        complaint=(EditText)findViewById(R.id.complaint);
        datas=new Datas();
        ch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Filechooser();
            }
        });

        up.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(uploadTask!=null && uploadTask.isInProgress()) {
                    Toast.makeText(MainActivity.this,"Upload in progress",Toast.LENGTH_LONG).show();
                }
                else {
                    Fileuploader();


                }
            }
        });

    }

    private String getExtension(Uri uri){
        ContentResolver cr=getContentResolver();
        MimeTypeMap mimeTypeMap=MimeTypeMap.getSingleton();
        return mimeTypeMap.getExtensionFromMimeType(cr.getType(uri));
    }

    private void Fileuploader(){
        String imageid;
        imageid=System.currentTimeMillis()+"."+getExtension(imguri);
        datas.setUsername(username.getText().toString().trim());
        datas.setComplaint(complaint.getText().toString().trim());
        datas.setLocation(location.getText().toString().trim());
        datas.setImageId(imageid);
        datas.setStatus("Complaint Registered");
        final StorageReference Ref=mStorageRef.child(imageid);
        uploadTask=Ref.putFile(imguri)
                .addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                         // Get a URL to the uploaded content
                        Ref.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                            @Override
                            public void onSuccess(Uri uri) {
                                final Uri downloadUrl = uri;
                                HashMap<String,String> hashMap=new HashMap<>();
                                hashMap.put("imageurl",String.valueOf(uri));
                                datas.setImageurl(String.valueOf(uri));
                                myRef.push().setValue(datas);
                                Toast.makeText(MainActivity.this,"Image uploaded successfully",Toast.LENGTH_LONG).show();


                            }
                        });
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        // Handle unsuccessful uploads
                        // ...
                    }
                });
    }

    private void Filechooser()
    {
        Intent intent=new Intent();
        intent.setType("image/");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(intent,1);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode==1 && resultCode==RESULT_OK && data!=null && data.getData()!=null){
            imguri=data.getData();
            img.setImageURI(imguri);
        }
    }
}
