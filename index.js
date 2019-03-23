const { ipcRenderer } = require('electron');
var fs=require('fs');
var path = require('path');
var gdal=require('gdal');
var fs=require('fs');
//var shp=require('./testgd.js');
 document.getElementById('select-directory').addEventListener('click',(event) => {
ipcRenderer.send('open-file-dialog')
 });
 var gg='';
 ipcRenderer.on('selected-directory',(event,path) => {				
	document.getElementById('selectedItem').innerHTML = path
	var mf=path.toString()
    gg=mf.replace(/\\/g,'/');
var dataset=gdal.open(gg,'r','ESRI Shapefile');
 var str3=[];
dataset.layers.get(0).features.forEach(function(feature) {
 var telpost = {};
   telpost["type"] = "Feature";
   telpost["geometry"]=feature.getGeometry().toObject();  
   telpost["properties"]= feature.fields.toObject();
    str3.push(telpost);
});
var str= JSON.stringify({"type": "FeatureCollection", "features": str3});
//fs.writeFile('data.json',str,function(err){
 //if (err) {res.status(500).send('Server is error...')}
 //})
 
   // shp.transshp(path);
    var viewer = new Cesium.Viewer('cesiumContainer');	
    //dataSource = Cesium.GeoJsonDataSource.load((__dirname.toString()).replace(/\\/g,'/')+"/data.json");
	dataSource = Cesium.GeoJsonDataSource.load(JSON.parse(str));
    viewer.dataSources.add(dataSource);
    viewer.zoomTo(dataSource);
 }
 )
 
 