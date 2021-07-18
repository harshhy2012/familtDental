// var myModal = document.getElementById('appointmentModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })

$('#FormFillModalToggle').on('show.bs.modal', function(){
    var myModal = $(this);
    clearTimeout(myModal.data('hideInterval'));
    myModal.data('hideInterval', setTimeout(function(){
        myModal.modal('hide');
    }, 4000));
  });