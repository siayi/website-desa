url = 'https://github.com/siayi/website-desa/sites.json';
$.getJSON(url, function (json) {
    count = new WebsiteCounter(json);
    $("#total").html(count.count);
    $("#kecamatan").html(count.kecamatan);
    $("#provinsi").html(count.provinsi);
    console.log(count);
    $(".render-bar").toggle();
    tables = new WebsiteTable(json);
    $.each(tables, function(key,table) {
      $("#tables").append(table);
    });
});


function WebsiteTable(data) {
  var tables = [];
  var headers = ["Desa", "Kecamatan", "Kabkot"]
  var formatted = {
    "Jawa Barat": [],
    "Jawa Tengah": [],
    "Jawa Timur": [],
   };

  $.each(data, function(key,site) {
    formatted[site.provinsi].push([site.title, site.kecamatan, site.kabkot, site.url])
  });

  $.each(formatted, function(provinsi,rows) {
   var table = '<h3>' + provinsi + '</h3><table class="table table-bordered table-striped table-condensed">';
   table = table + '<tr>';
   $.each(headers, function(key,header) {
     table= table + '<th>' + header + '</th>';
   });
   table = table + '</tr>';
   $.each(rows, function(key,row) {
     table = table + '<tr><td><a href="' + row[3] + '">' + row[0] + '</a></td><td>' + row[1] + '</td><td>' + row[2] + '</td></tr>'
   });
   table = table + '</table>'
   tables.push(table);
  });

  return tables;
}
function WebsiteCounter(data) {

  var count= 0;
  var kecamatan = [];
  var agencies= [];
  var provinsi = [];

  $.each(data, function(key,site) {
    count = count + 1;
    kecamatan = counter(kecamatan, site.kecamatan);
    provinsi = counter(provinsi, site.kabkot);
    agencies = counter(agencies, site.agency);
  });

  function counter(array, item) {
    if (array.indexOf(item) === -1) {
      array.push(item);
    }
    return array;
  }

  return {
    'count' : count,
    'agencies' : agencies.length,
    'provinsi' : provinsi.length,
    'kecamatan' : kecamatan.length
  }

}
