jQuery(document).ready(function($) {
   $('a[href$=".pdf"]')
        .attr('download', '')
        .attr('target', '_blank');
});
$.ajax({
  url:'/',
  type:'GET',
  data:{
    'action' : 1,
    'auth_option' : 1,
  },
  dataType:'json',
  success: function(data){
    $.fn.createProjectListTable(data)
  },
  error: function(xhr,errmsg,err){
    console.log(xhr.status + ": " + xhr.responseText)
    alert("Error")
  }
})

$.fn.createProjectListTable = function(data){
  console.log(data)
  var projectListTable = "<h3 style='text-align:left; padding-left:30px;'>Project List</h3><table id='projectListTable' class='masterTable'>"
                  + "<thead><tr><th>Project Name</th><th>Project Date</th><th>File Lists</th></tr></thead><tbody>"
  for(i = 0; i < data.project_list.length; i++){
    projectListTable+="<tr><td>"+data.project_list[i].project_name+"</td>"
                    + "<td>"+data.project_list[i].project_date+"</td>"
                    + "<td><a id='"+data.project_list[i].project_id+"' class='project' role='button'> Click here to View</a></td></tr>"
  }
  projectListTable += "</tbody></table>"
  $("#projectListDiv").html(projectListTable);
  $(".project").click(function(){
    var projectId = this.id;
    $.fn.getFileDetail(projectId);
  })
  // $(".dropbtn").click(function(){
  //   var showListBtnId = this.id;
  //   $.fn.showListDistrict(showListBtnId);
  // })
  $("#projectListTable").DataTable()
}

$.fn.getFileDetail = function(projectId){
  $.ajax({
      url:'/getFileDetail',
      type:'GET',
      data:{
        'action' : 1,
        'projectId' : projectId,
      },
      dataType:'json',
      success: function(data){
        $.fn.createFileListTable(data)
      },
      error: function(xhr,errmsg,err){
        console.log(xhr.status + ": " + xhr.responseText)
        $.fn.errorContent()
        alert("Error")
      }
    })
}
$.fn.createFileListTable = function(data){
  console.log(data)
  var fileListTable = "<h3 style='text-align:left; padding-left:30px;'>File List</h3><table id='fileListTable' class='masterTable'>"
                  + "<thead><tr><th>File Name</th><th>File Upload Date</th><th>File URL (Click to Download)</th></tr></thead><tbody>"
  for(i = 0; i < data.file_list.length; i++){
    var url = data.file_list[i].file_url
    var format = url.split('.').pop();
    fileListTable+="<tr><td>"+data.file_list[i].file_name+"</td>"
                    + "<td>"+data.file_list[i].file_upload_date+"</td>"
                    + "<td><a id='"+data.file_list[i].file_id+"' href='"+data.file_list[i].file_url+"' download>"+url+"</td></tr>"
    // if (format == "jpg" || format == "jpeg" ){
    //   fileListTable += "<td><button onclick='alert("")''></button></td></tr>"
    // } else if(format == "pdf"){
    //   fileListTable += "<td><a id='"+data.file_list[i].file_id+"' href='"+data.file_list[i].file_url+"' download>"+url+"</td></tr>"
    // } else {
    //   fileListTable += "<td><a id='"+data.file_list[i].file_id+"' href='"+data.file_list[i].file_url+"' download>"+url+"</td></tr>"
    // }

  }
  fileListTable += "</tbody></table>"
  $("#fileListDiv").html(fileListTable);
  $("#fileListTable").DataTable()
}
