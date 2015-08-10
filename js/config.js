var selectedVals = [];

function readSingleFile(evt) {
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0];

  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      var allText = contents;
      allText = allText.replace(/\r/gm, '~');
      // console.log(allText);
      allTextLines = allText.split("~");
      //console.log(allTextLines.length);
      document.getElementById("tablediv").innerHTML = "";
      document.getElementById("resultdiv").innerHTML = "";
      var headers = allTextLines[0].split(',');
      //console.log(headers);
      selectBox1 = document.createElement("select");
      selectBox2 = document.createElement("select");
      selectBox1.setAttribute("id", "select1");
      selectBox2.setAttribute("id", "select2");

      tableObj = {};

      tr = document.createElement('tr');
      for (var k = 0; k < headers.length; k++) {
        var op = new Option();
        var op1 = new Option();
        op.value = op1.value = headers[k];
        op.text = op1.text = headers[k];
        selectBox1.options.add(op);
        selectBox2.options.add(op1);
        tableObj[headers[k]] = []
        th = document.createElement('th');
        th.appendChild(document.createTextNode(headers[k]));

        tr.appendChild(th);

      }
      //console.log(tableObj);
      document.getElementById("tablediv").appendChild(selectBox1);
      document.getElementById("tablediv").appendChild(selectBox2);

      table = document.createElement("table");
      table.setAttribute("id", "myTable");
      table.appendChild(tr);

      var lines = [];

      for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
          tr = document.createElement('tr');
          var tarr = [];
          for (var j = 0; j < headers.length; j++) {

            tableObj[headers[j]].push(data[j]);
            td = document.createElement('td');
            td.appendChild(document.createTextNode(data[j]));
            tr.appendChild(td);
            table.appendChild(tr);
            tarr.push(headers[j] + ":" + data[j]);
          }
          lines.push(tarr);
        }
      }
      //console.log(tableObj);
      document.getElementById("tablediv").appendChild(table);



      document.getElementById('button').addEventListener('click', crossTab, false);



    }
    r.readAsText(f);
  } else {
    alert("Failed to load file");
  }
}

function crossTab(evt) {

  document.getElementById("resultdiv").innerHTML = "";

  select1 = document.getElementById("select1");
  select2 = document.getElementById("select2");
  selectValue1 = select1.options[select1.selectedIndex].value;
  selectValue2 = select2.options[select2.selectedIndex].value;


  var arr1, arr2;
  arr1 = [];
  arr2 = [];
  col1 = tableObj[selectValue1];
  col2 = tableObj[selectValue2];
  arr1.push(col1[0]);
  arr2.push(col2[0]);
  console.log(col1.length);
  console.log(col2.length);
  for (i = 1; i < col1.length; i++) {
    //console.log(col1[i]);
    //console.log(col2[i]);
    if (arr1.indexOf(col1[i]) == -1) {
      arr1.push(col1[i]);
    }

    if (arr2.indexOf(col2[i]) == -1) {
      arr2.push(col2[i]);
    }
  }
  console.log(arr1.length);
  console.log(arr2.length);
  Array.matrix = function(numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
      var columns = [];
      for (var j = 0; j < numcols; ++j) {
        columns[j] = initial;
      }
      arr[i] = columns;
    }
    return arr;
  }
  var resultArr = Array.matrix(arr1.length, arr2.length, 0);

  for (ir = 0; ir < col1.length; ir++) {
    rowVal = col1[ir];
    colVal = col2[ir];
    rowIndex = arr1.indexOf(rowVal);
    colIndex = arr2.indexOf(colVal);

    resultArr[rowIndex][colIndex]++;

  }
  table = document.createElement("table");
  table.setAttribute("id", "resultTable");

  tr = document.createElement('tr');
  th = document.createElement('th');
  th.appendChild(document.createTextNode('X'));
  tr.appendChild(th);
  for (i = 0; i < arr2.length; i++) {
    th = document.createElement('th');
    th.appendChild(document.createTextNode(arr2[i]));
    tr.appendChild(th);
  }

  table.appendChild(tr);
  document.getElementById("resultdiv").appendChild(table);
  for (i = 0; i < arr1.length; i++) {
    oneRow = '';
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.setAttribute('class', 'rh');
    td.appendChild(document.createTextNode(arr1[i]));
    tr.appendChild(td);
    console.log(arr2[i]);
    for (j = 0; j < arr2.length; j++) {
      td = document.createElement('td');
      td.appendChild(document.createTextNode(resultArr[i][j]));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }



}





document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
