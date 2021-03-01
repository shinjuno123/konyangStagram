//drag and drop
document.querySelectorAll('#drop-zone__input').forEach(inputElement=>{
    const dropZoneElement = inputElement.closest('#drop-zone');

    dropZoneElement.addEventListener("click",e=>{
        document.getElementById('drop-zone__input').click();
    })

    dropZoneElement.addEventListener('dragover',e=>{
        e.preventDefault();
        console.log("dragover");
    })

    dropZoneElement.addEventListener("dragleave",e=>{
        console.log("dragend");
    })

    dropZoneElement.addEventListener("drop",e=>{
        e.preventDefault();

        if(e.dataTransfer.files.length){
            inputElement.files = e.dataTransfer.files
        }
    })


});

