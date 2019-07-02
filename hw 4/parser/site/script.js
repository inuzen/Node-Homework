$(function(){
	sendFile.addEventListener('change', takeFile, false);

	function takeFile(e){
		var files = e.target.files;
		console.log(files);
		var file = files[0];
		$.ajax({
			type:'POST',
			url: file.name,
			data: file,
			processData: false,
			success: function(response) { //����� �� ������� � ���������� response
				// alert(response);
			}
		});
	}
});
