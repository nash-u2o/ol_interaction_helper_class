//NOTE: Due to CORS request issues in the official implementation of the helper class, the JS for the class is in the html file
$(function() {
    $('#select option[value="draw-polygon"]').attr('selected', true)
    const source = new ol.source.Vector({wrapX: false});

    const vector = new ol.layer.Vector({
        source: source,
    });

    const map = new ol.Map({
        view: new ol.View({
            center: [0, 0],
            zoom: 1,
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            vector,
        ],
        target: 'map',
    });

    const drawPolygon = new ol.interaction.Draw({
        type: "Polygon",
        source: source,
    });

    const drawMultipolygon = new ol.interaction.Draw({
        type: "MultiPolygon",
        source: source,
    })

    const drawPolyline = new ol.interaction.Draw({
        type: "LineString",
        source: source,
    });




    const mapInteractor = new mapInteractions(map);
    mapInteractor.addInteraction("draw-polygon", drawPolygon);

    //Add other interactions and deactivate them
    mapInteractor.addMultiInteraction("draw-multipolygon", "Polygon", {source: source});
    mapInteractor.deactivateInteraction("draw-multipolygon");

    mapInteractor.addInteraction("draw-polyline", drawPolyline);
    mapInteractor.deactivateInteraction("draw-polyline");

    mapInteractor.addMultiInteraction("draw-multilinestring", "LineString", {source: source});
    mapInteractor.deactivateInteraction("draw-multilinestring");

    mapInteractor.addMultiInteraction("draw-multipoint", "Point", {source: source});
    mapInteractor.deactivateInteraction("draw-multipoint");

    mapInteractor.addDragInteraction("drag", {layers: [vector]});
    mapInteractor.deactivateInteraction("drag");

    mapInteractor.addModifyInteraction("modify-existing", {layers:[vector]}, {newPoints: false});
    mapInteractor.deactivateInteraction("modify-existing");
    
    mapInteractor.addModifyInteraction("modify-new", {layers:[vector]}, {newPoints: true});
    mapInteractor.deactivateInteraction("modify-new");

    //Add snap interaction last or it will not behave properly when reactivated 
    mapInteractor.addSnapInteraction("snap", {source: source});

    $('#select').change(function(){
        switch($(this).val()){
            case 'draw-polygon':
                //Test removal functions
                //mapInteractor.removeAllInteractions(); 
                //mapInteractor.removeInteraction("snap");
                //mapInteractor.removeInteraction("drag");
                //mapInteractor.removeInteraction("modify");
                //mapInteractor.removeInteraction("draw-polyline");

                mapInteractor.deactivateAllInteractions();

                mapInteractor.activateInteraction("draw-polygon");
                mapInteractor.activateInteraction("snap");
                break;
            case 'draw-polyline':
                mapInteractor.deactivateAllInteractions();

                mapInteractor.activateInteraction("draw-polyline");
                mapInteractor.activateInteraction("snap");
                break;
            case 'draw-multipolygon':
                mapInteractor.deactivateAllInteractions();

                mapInteractor.activateInteraction("draw-multipolygon");
                mapInteractor.activateInteraction("snap");
                break;
            case 'draw-multilinestring':
                mapInteractor.deactivateAllInteractions();

                mapInteractor.activateInteraction("draw-multilinestring");
                mapInteractor.activateInteraction("snap");
                break;
            case 'draw-multipoint':
                mapInteractor.deactivateAllInteractions();

                mapInteractor.activateInteraction("draw-multipoint");
                mapInteractor.activateInteraction("snap");
                break;
            case 'move':
                mapInteractor.deactivateAllInteractions();

                mapInteractor.activateInteraction("drag");
                mapInteractor.activateInteraction("snap");
                break;
            case 'modify-existing':
                mapInteractor.deactivateAllInteractions();

                mapInteractor.activateInteraction("modify-existing");
                mapInteractor.activateInteraction("snap");
                break;
            case 'modify-new':
                mapInteractor.deactivateAllInteractions();

                mapInteractor.activateInteraction("modify-new");
                mapInteractor.activateInteraction("snap");
                break;
        }
    });
});