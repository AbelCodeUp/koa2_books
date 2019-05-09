"use strict";

$(function () {
  $('#save').click(function (event) {
    event.preventDefault();
    var name = $('#name').val();
    var author = $('#author').val();
    var number = $('#number').val();
    $.ajax({
      type: 'post',
      url: '/create',
      data: {
        name: name,
        author: author,
        number: number
      },
      dataType: 'json',
      success: function (res) {
        alert(res.message);
      }
    });
  });
  $('#updateSave').click(function (event) {
    event.preventDefault();
    var id = $('#bookId').val();
    var name = $('#name').val();
    var author = $('#author').val();
    var number = $('#number').val();
    $.ajax({
      type: 'post',
      url: '/update',
      data: {
        name: name,
        author: author,
        number: number,
        id: id
      },
      dataType: 'json',
      success: function (res) {
        alert(res.message);
      }
    });
  });
  $('#bookTable').click(function (event) {
    var el = event.target;
    var id = $(el).data('id');

    if (id) {
      $.ajax({
        type: 'post',
        url: '/delete',
        data: {
          id: id
        },
        dataType: 'json',
        success: function (res) {
          alert(res.message);
          location.reload();
        }
      });
    }
  });
});