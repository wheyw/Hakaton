document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('image_url');
document.getElementById('fileUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];

    const maxSize = 5 * 1024 * 1024; // 5 MB в байтах
    const errorMessage = document.getElementById('errorMessage');

    if (file && file.size > maxSize) {
        errorMessage.textContent = 'File size exceeds 5 MB limit!';
        event.target.value = ''; // Очищаем поле загрузки
        return;
    } else {
        errorMessage.textContent = ''; // Убираем сообщение об ошибке
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            const editBtn = document.getElementById('uploadBtn');
            preview.src = e.target.result;
            preview.classList.remove('d-none');  // Показываем превью изображения
            editBtn.classList.remove('d-none');  // Показываем кнопку редактирования
            uploadFile(e.target.result)
        };
        reader.readAsDataURL(file);
    }
});
});

function uploadFile(file_url) {
    localStorage['image_url'] = file_url;
}

function getUploadedFile() {
    let file = localStorage['image_url'];
    if(file) return file;
    else return null;
}
