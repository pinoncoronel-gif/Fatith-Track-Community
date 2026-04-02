import React, { useState } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const fileChangeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        setUploading(true);
        
        // Simulate file upload - replace this with your actual upload logic
        const uploadTask = new Promise((resolve) => {
            const totalSize = selectedFile.size;
            let uploadedSize = 0;

            const interval = setInterval(() => {
                uploadedSize += totalSize / 10; // Simulate progress
                setUploadProgress(Math.min((uploadedSize / totalSize) * 100, 100));

                if (uploadedSize >= totalSize) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });

        uploadTask.then(() => {
            setUploading(false);
            setSelectedFile(null);
            alert('Upload successful!');
        });
    };

    return (
        <div>
            <input type="file" accept=".zip, .mp3" onChange={fileChangeHandler} />
            <button onClick={uploadFile} disabled={!selectedFile || uploading}>
                {uploading ? `Uploading... (${uploadProgress}%)` : 'Upload'}
            </button>
            {uploading && <progress value={uploadProgress} max="100" />}
        </div>
    );
};

export default FileUpload;