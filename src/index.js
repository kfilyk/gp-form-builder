var sections = 0;
var images = 0;
var tables = 0;
var signatures = 0;
var review_footer = false;


$('#insert-selector').change(function(event) {
    let val = $('#insert-selector').val();
    if(val == "image") {
        insertImage()
    } else if(val == "table") {
        insertTable()
    } else if(val == "section"){
        insertSection()
    } else if(val == "signature"){
        insertSignature()
    }

    $('#insert-selector').prop('selectedIndex', 0); // reset the insertion selector
}); 


$('#location-selector').change(function(event) {
    $('#location').html($('#location-selector').val());
}); 

$('#type-selector').change(function(event) {

    // reset counts
    sections = 0;
    images = 0;
    tables = 0; 
    signatures = 0;
    review_footer = false;

    // remove all sections, images, tables
    $('.section-container').remove() 
    $('.image-container').remove()
    $('.table-container').remove()
    $('.review-container').remove()


    if($('#type-selector').val() == "PROPOSAL") {
        $('#proposal-header').css({"display": "table-row"});
        $('#proposal-title').html('<div contenteditable style="text-align: center;" placeholder="Re: Type of Report/Letter - Title of Report/Letter"></div><br/><div contenteditable style="text-align: center;" placeholder="Address of Development/Project"></div>');
        $('#file-r').css({"display": "block"});
        $('#file-co').css({"display": "block"});
        $('#file-prp').css({"display": "block"});
        $('#client-name').css({"display": "block"});
        $('#file-memo').hide();
        $('#client-project').hide();
        $('#review-container').hide();

    } else if($('#type-selector').val() == "GEOTECHNICAL MEMORANDUM") {
        $('#proposal-header').css({"display": "table-row"});
        $('#proposal-title').html($('#type-selector').val());
        $('#client-project').css({"display": "block"});
        $('#file-memo').css({"display": "block"});
        $('#file-r').hide();
        $('#file-co').hide();
        $('#file-prp').hide();
        $('#client-name').hide();
        $('#review-container').css({"display": "table"});
        insertMemorandum()

    } else {
        $('#proposal-header').hide();
        $('#proposal-title').html($('#type-selector').val());
        $('#review-container').hide();

    }
}); 

function initDocument() {
    document.getElementById("date").innerHTML = new Date(Date.now()).toDateString();
}

function getScrollHeight(elm){
    var savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    elm.value = savedValue
}

function onExpandableTextareaInput({ target:elm }){
    // make sure the input event originated from a textarea and it's desired to be auto-expandable
    if( !elm.classList.contains('autoExpand') || !elm.nodeName == 'TEXTAREA' ) return
    
    var minRows = elm.getAttribute('data-min-rows')|0, rows;
    !elm._baseScrollHeight && getScrollHeight(elm)

    elm.rows = minRows
    rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
    elm.rows = minRows + rows
}


// global delegated event listener
document.addEventListener('input', onExpandableTextareaInput)

//------------------------------------------------------ IMAGE FUNCTIONALITY ------------------------------------------------------//

function insertImage() {
    $( "#memo" ).append(`
        <tr class="image-container ui-sortable-handle" id=\'ic`+images+`\'>
            <td colspan='100%'>
                <button onclick=deleteImage(`+images+`)>x</button>
                <div class="image-drop-area" id='i`+images+`'>Drop image here...</div>
                <div style="text-align:center" contenteditable>Figure `+(images+1)+`</div>
            </td>
        </tr>
    `);

    var image_drop_area = document.getElementById("i"+images);
    var uploaded_image;

    // Event listener for dragging the image over the div
    image_drop_area.addEventListener('dragover', (event) => {
        event.stopPropagation();
        event.preventDefault();
        // Style the drag-and-drop as a "copy file" operation.
        event.dataTransfer.dropEffect = 'copy';
    });

    // Event listener for dropping the image inside the div
    image_drop_area.addEventListener('drop', (event) => {
        event.stopPropagation();
        event.preventDefault();
        fileList = event.dataTransfer.files;
        //document.querySelector("#file_name").textContent = fileList[0].name;
        console.log(fileList[0])
        readImage(fileList[0], image_drop_area.id);
    });

    // Converts the image into a data URI
    readImage = (file, i) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            uploaded_image = event.target.result;
            var image = new Image();
            image.src = uploaded_image;
            image.onload = function() {
                //console.log("IMAGE: "+this.width+", "+ this.height);
                $("#"+i).css("width", "100%"); // reset container to largest possible size 
                $("#"+i).css("height", "100%");

                const container_width = $("#"+i).width()
                const container_height = $("#"+i).height()
                //console.log(i)
                //console.log("CONTAINER: "+container_width+ ", "+ container_height)
                
                if(this.width > container_width) { // cap image width + unrestrict size
                    $("#"+i).css("height", (container_width/this.width)*(this.height));
                } else { // otherwise, shrink to fit smaller image
                    $("#"+i).css("width", this.width);
                    $("#"+i).css("height", this.height);
                }
                $("#"+i).html("");
            };
            //console.log("IMAGE: ", document.getElementById(i))
            document.getElementById(i).style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(file);
    }

    images++;
}

function deleteImage(id) {
    $( "#ic"+id).remove();
}

//------------------------------------------------------ SECTION FUNCTIONALITY ------------------------------------------------------//

function insertSection() {
    $( "#memo" ).append(`
        <tr class="section-container ui-sortable-handle" id=\'sc`+sections+`\'>
            <td colspan='100%' class='section'>
                <button onclick=deleteSection(`+sections+`)>x</button></br>
                <div contenteditable placeholder="Section Header" class="section-header" id=sh`+sections+`></div>
                <textarea id = s`+sections+` class='autoExpand' rows='3' data-min-rows='3' autofocus placeholder='...'></textarea>

            </td>
        </tr>
    `)
    enableTab("s"+sections)
    sections++;
}

function deleteSection(id) {
    $( "#sc"+id).remove();
}

//------------------------------------------------------ SIGNATURE FUNCTIONALITY ------------------------------------------------------//

function insertSignature() {
    $( "#memo" ).append(`
        <tr class="signature-container ui-sortable-handle" id=\'sic`+signatures+`\'>
            <td colspan='100%'>
                <button onclick=deleteSignature(`+signatures+`)>x</button></br>

                <table>
                    <tr>
                        <td><div contenteditable/>Yours, </div>
                    </tr>
                    <tr>
                        <td colspan='50%' class="signature">
                            <div contenteditable/>GeoPacific Consultants Ltd.</div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div contenteditable/>Name</div><br/>
                            <div contenteditable/>Title</div><br/>

                        </td>
                        <td colspan='50%' class='reviewer'>
                            <div contenteditable/>Reviewed By:</div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <div contenteditable/>Name</div><br/>
                            <div contenteditable/>Title</div><br/>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `)
    signatures++;

}

function deleteSignature(id) {
    $( "#sic"+id).remove();
}

//------------------------------------------------------ TABLE FUNCTIONALITY ------------------------------------------------------//
function insertTable() {
    $( "#memo" ).append(`
        <tr class="table-container ui-sortable-handle" id=\'table-container-`+tables+`\'>
            <td colspan='100%'>
                <div class='table-control'>
                <button onclick=deleteTable(`+tables+`)>x</button>
                Columns <button onclick= delColumn(\'t`+tables+`\') >-</button><button onclick= addColumn(\'t`+tables+`\') >+</button>
                Rows <button onclick= delRow(\'t`+tables+`\') >-</button><button onclick= addRow(\'t`+tables+`\') >+</button>
                </div>
                <table id = \'t`+tables+`\' class = 'content-table' contenteditable>

                    <tr class='header-row'> 
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr> 
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </table>
                <div style="text-align:center" contenteditable>Table `+(tables+1)+`</div>
            </td>
        </tr>
    `)

    tables++;
}

function addColumn(tableId) {
    var row = 0;
    $( "#"+tableId+" tr").each(function(){
        if(row == 0) {
            $(this).append('<th>&nbsp;</th>');
        } else {
            $(this).append('<td>&nbsp;</td>');
        }
        row++;
    });
    console.log($( "#"+tableId ).children())
}

function delColumn(tableId) {
    var row = 0;
    $( "#"+tableId+" tr").each(function(){
        if(row == 0) {
            $(this).find("th:last").remove();
        } else {
            $(this).find("td:last").remove();
        }
        row++;
    });
    console.log($( "#"+tableId ).children())
}

function addRow(tableId) {
    var cols = $( "#"+tableId+" tr:last-child").children().length;
    var new_row = "<tr>"
    for(var c = 0; c<cols; c++) {
        new_row += "<td>&nbsp;</td>"
    }
    new_row +="</tr>"
    $( "#"+tableId).append(new_row)
}

function delRow(tableId) {
    $( "#"+tableId).find("tr:last").remove();
}

function deleteTable(id) {
    $( "#table-container-"+id).remove();
}

// allows the use of tab '/t' in text areas.

function enableTab(id) {
    var el = document.getElementById(id);
    el.onkeydown = function(e) {
        if (e.keyCode === 9) { // tab was pressed

            // get caret position/selection
            var val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            return false;

        }
    };
}


//------------------------------------------------------ MEMORANDUM FUNCTIONALITY ------------------------------------------------------//
function insertMemorandum() {
    insertTable();
    $("#t0").val("PURPOSE")
    //console.log($("#t0 .header-row").children().toArray())
    $("#t0 .header-row").children('th:nth-child(1)').html("TIME")
    $("#t0 .header-row").children('th:nth-child(2)').html("WEATHER")
    $("#t0 .header-row").children('th:nth-child(3)').html("MACHINERY/EQUIPTMENT ADJACENT TO EXCAVATION")


    insertSection();
    $("#sh0").val("PURPOSE")
    insertSection();
    $("#sh1").val("OBSERVATIONS")
    insertSection();
    $("#sh2").val("CONCLUSIONS & RECOMMENDATIONS")
    insertImage();
}

//------------------------------------------------------ VARIOUS FUNCTIONALITY ------------------------------------------------------//

// make memo items rearrangeable
$("#memo").sortable({
    cancel: ':input, [contenteditable]',
    cursor: 'row-resize',
    placeholder: 'ui-state-highlight',
    opacity: '0.55',
    items: '.ui-sortable-handle'
});

// Placeholders in contenteditable divs
$("div").focusout(function(){
    var element = $(this);        
    if (!element.text().replace(" ", "").length) {
        element.empty();
    }
});

//------------------------------------------------------ UPLOAD FUNCTIONALITY ------------------------------------------------------//

// Trigger file upload  
$('#upload-button').click(function(){ $('#upload-input').trigger('click'); });

function readJSON(event){
    console.log(event)
    var form = JSON.parse(event.target.result);
    console.log(form)
    console.log($("#type-selector"))//.attr("value", obj['type'])
    $("#type-selector").val(form['type']).change();
    // remove all memo sections
    $(".image-container").remove();
    $(".section-container").remove();
    $(".table-container").remove();
    $(".signature-container").remove();

    $("#location-selector").val(form['location']).change();
    $("#proposal-header").replaceWith(form['header'])

    for(var i = 0; form.hasOwnProperty('e'+i); i++ ) {
        $("#memo").append(form['e'+i])
        //console.log(i)
    }
}

document.getElementById('upload-input').addEventListener('change', (event) => {
    console.log("UPLOADING")
    var reader = new FileReader();
    reader.onload = readJSON;
    reader.readAsText(event.target.files[0])
    console.log(event.target.files)

});

//------------------------------------------------------ PDF FUNCTIONALITY ------------------------------------------------------//

var current = document.getElementById('pdf-button'); 

current.addEventListener('click', (event) => {
    window.api.invoke('download_pdf', [1,2,3])
        .then(function(res) {
            console.log(res); // will print "This worked!" to the browser console
        })
        .catch(function(err) {
            console.error(err); // will print "This didn't work!" to the browser console.
        });
});

//------------------------------------------------------ SAVE FUNCTIONALITY ------------------------------------------------------//

function saveForm() {
    //console.log("HTML: ", document)
    var form = {}

    var type = document.getElementById("type-selector")
    form['type'] = type.options[type.selectedIndex].value

    var location = document.getElementById("location-selector")
    form['location'] = location.options[location.selectedIndex].value

    form['header'] = $('#proposal-header')[0].outerHTML;
    /*
    var $inputs = $('#proposal-header :input');
    console.log($inputs)
    $inputs.each(function() {
        form[this.id] = $(this).val();
    });
    */

    var element = 0; // start denoting memo elements; and save them in order
    var rows = $('#memo').children('tr').map(function() {

        // get all inputs, selects, and textareas 
        var classes = $(this).attr('class')
        console.log($(this))
        if(classes.includes('table-container')) {
            console.log("TABLE");
            form['e'+element] = $(this)[0].outerHTML;
            element++

        } else if(classes.includes('section-container')) {
            console.log("SECTION");
            var txtarea = $(this).find('textarea')[0]
            txtarea.textContent = txtarea.value /* save text area content */ 
            form['e'+element] = $(this)[0].outerHTML;
            element++

        } else if(classes.includes('image-container')) {
            console.log("IMAGE");
            form['e'+element] = $(this)[0].outerHTML;
            element++

        } else if(classes.includes('signature-container')) {
            console.log("SIGNATURE");
            form['e'+element] = $(this)[0].outerHTML;
            element++

        } 

        }).get();

    window.api.invoke('save_json', JSON.stringify(form))
        .then(function(res) {
            console.log(res); // will print "This worked!" to the browser console
        }).catch(function(err) {
            console.error(err); // will print "This didn't work!" to the browser console.
        });

    //console.log("Proposal Header: ", $("")[0]) 
    //console.log("SCRIPT: ", $("script"))
}

