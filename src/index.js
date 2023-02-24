var sections = 0;
var selections = 0;
var images = 0;
var tables = 0;
var signatures = 0;
var remarks = 0;
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
    } else if(val == "remark"){
        insertRemark("")
    }else if(val == "selection"){
        insertSelection()
    }

    $('#insert-selector').prop('selectedIndex', 0); // reset the insertion selector
}); 


$('#location-selector').change(function(event) {
    $('#location').html($('#location-selector').val());
}); 

$('#type-selector').change(function(event) {

    // reset counts
    sections = 0;
    selections = 0;
    images = 0;
    tables = 0; 
    signatures = 0;
    remarks = 0;

    review_footer = false;

    // remove all sections, images, tables
    $('.section-container').remove() 
    $('.selection-container').remove() 
    $('.image-container').remove()
    $('.table-container').remove()
    $('.review-container').remove()
    $('.remark-container').remove()


    if($('#type-selector').val() == "PROPOSAL") {
        $('#proposal-header').css({"display": "table-row"});
        $('#proposal-title').html('<div contenteditable style="text-align: center;" placeholder="Re: Type of Report/Letter - Title of Report/Letter"></div><div contenteditable style="text-align: center;" placeholder="Address of Development/Project"></div>');
        $('#file-r').css({"display": "block"});
        $('#file-co').css({"display": "block"});
        $('#file-prp').css({"display": "block"});
        $('#file-memo').hide();
        $('#client-name').css({"display": "block"});
        $('#client-project-manager').hide();
        $('#client-project').hide();
        $('#risk-professional').hide();
        $('#risk-firm').hide();
        $('#risk-practice-number').hide();

        $('#review-container').hide();


    } else if($('#type-selector').val() == "GEOTECHNICAL MEMORANDUM") {
        $('#proposal-header').css({"display": "table-row"});
        $('#proposal-title').html($('#type-selector').val());

        $('#client-project').css({"display": "block"});
        $('#client-project-manager').hide();
        $('#client-name').hide();
        $('#file-memo').css({"display": "block"});
        $('#file-r').hide();
        $('#file-co').hide();
        $('#file-prp').hide();
        $('#risk-professional').hide();
        $('#risk-firm').hide();
        $('#risk-practice-number').hide();
        $('#review-container').css({"display": "table"});

        // insert memo containers
        insertTable();
        $("#t0").val("PURPOSE")
        //console.log($("#t0 .row-0").children().toArray())
        $("#t0 .row-0").children('th:nth-child(1)').html("TIME")
        $("#t0 .row-0").children('th:nth-child(2)').html("WEATHER")
        $("#t0 .row-0").children('th:nth-child(3)').html("MACHINERY/EQUIPTMENT ADJACENT TO EXCAVATION")
    
        insertSection();
        $("#sh0").val("PURPOSE")
        insertSection();
        $("#sh1").val("OBSERVATIONS")
        insertSection();
        $("#sh2").val("CONCLUSIONS & RECOMMENDATIONS")
        insertImage();
    
    } else if($('#type-selector').val() == "RISK ASSESSMENT") {
        $('#client-name').hide();
        $('#file-number').hide();
        $('#file-memo').hide();
        $('#file-r').hide();
        $('#file-co').hide();
        $('#file-prp').hide();
        $('#risk-professional').css({"display": "block"});
        $('#risk-firm').css({"display": "block"});
        $('#risk-practice-number').css({"display": "block"});

        $('#proposal-header').css({"display": "table-row"});
        $('#proposal-title').html(`
            <div contenteditable style="text-align: center;">
                <select id="risk-selector">
                    <option>PROJECT-SPECIFIC</option>
                    <option>GLOBAL</option>
                    <option>ITERATIVE</option>
                </select>RISK ASSESSMENT: 
            </div>
            <div contenteditable style="text-align: center;" placeholder="Address of Development/Project"></div>`
        );
        enableRiskSelectorListener()
        insertRemark("This (Temporary Shoring / Drill Test Pit) documented risk assessment is to be completed during preparation of design drawings, before proposing or accepting contracts. </br> Risk assessments must be filed in the project folder after client acceptance.");
        insertTable();
        $("#th0").html("Table 1. Considerations of Risk Assessment")
        delColumn('t0')
        addRow('t0')
        addRow('t0')
        addRow('t0')
        addRow('t0')
        addRow('t0')
        addRow('t0')
        addRow('t0')
        addRow('t0')
        $("#t0 .row-0").children('th:nth-child(1)').html("Risk Consideration")
        $("#t0 .row-0").children('th:nth-child(2)').html("Remark")

        $("#t0 .row-1").children('td:nth-child(1)').html("Expertise of Professional")
        $("#t0 .row-2").children('td:nth-child(1)').html("Experience of Subordinates")
        $("#t0 .row-3").children('td:nth-child(1)').html("Similar Project Experience?")
        $("#t0 .row-4").children('td:nth-child(1)').html("Project Complexity")
        $("#t0 .row-5").children('td:nth-child(1)').html("Innovative Features")
        $("#t0 .row-6").children('td:nth-child(1)').html("Departures from Previous Practice")
        $("#t0 .row-7").children('td:nth-child(1)').html("Applicable Codes, Standards and Regulations that define Risk Tolerance")
        $("#t0 .row-8").children('td:nth-child(1)').html("Hazard Identification Techniques Used")
        $("#t0 .row-9").children('td:nth-child(1)').html("Recommended Documents and Client Information")

        insertTable();
        $("#th1").html("Table 2. Risk Matrix")
        addRow('t1')
        addRow('t1')
        addRow('t1')
        addRow('t1')

        addColumn('t1')
        addColumn('t1')
        addColumn('t1')

        $("#t1 .row-0").children('th:nth-child(1)').html("Hazard")
        $("#t1 .row-1").children('td:nth-child(1)').html("Utility Strike (Gas / Electrical)")
        $("#t1 .row-2").children('td:nth-child(1)').html("Utility Strike (Water / Storm / Septic / Low voltage electrical / Telecom)")
        $("#t1 .row-3").children('td:nth-child(1)').html("Encountering Flowing Artesian Conditions (uncontrolled flow)")
        $("#t1 .row-4").children('td:nth-child(1)').html("Encountering Flowing Artesian Conditions (controlled flow)")
        $("#t1 .row-5").children('td:nth-child(1)').html("Incorrect/Incomplete Drill/Base Data")

        $("#t1 .row-0").children('th:nth-child(2)').html("Consequence")
        $("#t1 .row-1").children('td:nth-child(2)').html("Possible loss to human life, minor to severe on site, off-site municipal or private property damage")
        $("#t1 .row-2").children('td:nth-child(2)').html("Minor on-site, off-site municipal or private property damage. Injury very unlikely")
        $("#t1 .row-3").children('td:nth-child(2)').html("May overwhelm on-site / off-site drainage infrastructure, void creation, off-site dewatering related settlement, sediment laden runoff that may harm aquatic habitats, aquifer to aquifer contamination, waste of groundwater, may lower pressure in aquifer, affecting the yield of neighbouring wells and springs")
        $("#t1 .row-4").children('td:nth-child(2)').html("Temporary sediment laden runoff, small void creation")
        $("#t1 .row-5").children('td:nth-child(2)').html("Incorrect design recommendations")

        $("#t1 .row-0").children('th:nth-child(3)').html("Severity")
        $("#t1 .row-1").children('td:nth-child(3)').html("5/5").css("background-color", "orangered")
        $("#t1 .row-2").children('td:nth-child(3)').html("3/5").css("background-color", "yellow")
        $("#t1 .row-3").children('td:nth-child(3)').html("4/5").css("background-color", "orange")
        $("#t1 .row-4").children('td:nth-child(3)').html("2/5").css("background-color", "greenyellow")
        $("#t1 .row-5").children('td:nth-child(3)').html("4/5").css("background-color", "orange")


        $("#t1 .row-0").children('th:nth-child(4)').html("Likelihood")
        $("#t1 .row-1").children('td:nth-child(4)').html("2/5").css("background-color", "greenyellow")
        $("#t1 .row-2").children('td:nth-child(4)').html("2/5").css("background-color", "greenyellow")
        $("#t1 .row-3").children('td:nth-child(4)').html("1/5").css("background-color", "lime")
        $("#t1 .row-4").children('td:nth-child(4)').html("1/5").css("background-color", "lime")
        $("#t1 .row-5").children('td:nth-child(4)').html("2/5").css("background-color", "greenyellow")


        $("#t1 .row-0").children('th:nth-child(5)').html("Risk")
        $("#t1 .row-1").children('td:nth-child(5)').html("4/5").css("background-color", "orange")
        $("#t1 .row-2").children('td:nth-child(5)').html("3/5").css("background-color", "yellow")
        $("#t1 .row-3").children('td:nth-child(5)').html("3/5").css("background-color", "yellow")
        $("#t1 .row-4").children('td:nth-child(5)').html("2/5").css("background-color", "greenyellow")
        $("#t1 .row-5").children('td:nth-child(5)').html("3/5").css("background-color", "yellow")

        $("#t1 .row-0").children('th:nth-child(6)').html("Applicable?")
        $("#t1 .row-1").children('td:nth-child(6)').html("<input type='checkbox'>")
        $("#t1 .row-2").children('td:nth-child(6)').html("<input type='checkbox'>")
        $("#t1 .row-3").children('td:nth-child(6)').html("<input type='checkbox'>")
        $("#t1 .row-4").children('td:nth-child(6)').html("<input type='checkbox'>")
        $("#t1 .row-5").children('td:nth-child(6)').html("<input type='checkbox'>")


        insertTable();
        $("#th2").html("Table 3. Mitigation Matrix")
        addRow('t2')
        addRow('t2')
        addColumn('t2')
        addColumn('t2')


        $("#t2 .row-0").children('th:nth-child(1)').html("Hazard")
        $("#t2 .row-1").children('td:nth-child(1)').html('Utility Strike')
        $("#t2 .row-2").children('td:nth-child(1)').html('Artesian Conditions');
        $("#t2 .row-3").children('td:nth-child(1)').html('Incorrect/Incomplete Drill/Base Data');

        $("#t2 .row-0").children('th:nth-child(2)').html("Mitigation")
        $("#t2 .row-1").children('td:nth-child(2)').html("Conduct “BC One-Call (BCOC)” and engage sub-contractor to locate site-specific utilities prior to drilling. Gather as-built plans from client / civil designer.")
        $("#t2 .row-2").children('td:nth-child(2)').html(`Special consideration should be given to sites where artesian conditions are known to exist, prior to any drill based investigation. As defined by EGBC, the minimum “screening” for flowing artesian conditions should, at a minimum, include the following: 
        <br><br>• Evaluation of available geological, topographic, and aerial photography mapping
        <br><br>• Review of well logs available online through the province of BC Groundwater Wells and Aquifers (GWELLS) application
        <br><br>• Review of available Well Drilling Advisories for Flowing Artesian Conditions (Province of BC 2020b)
        <br><br>• The development of a conceptual hydrogeological model for the project site that considers: available data, formations likely to be encountered, probable recharge area, potential for constrictors, potential for penetrating aquitards, potential for penetrating productive aquifers below the confining layers
        <br><br>• Review of the Water Resource Atlas of British Columbia and any applicable well logs nearby to the proposed investigation
        <br><br>• Development of a water management plan that addresses both controlled discharge of non-turbid groundwater, and uncontrolled discharge of potentially contaminated with fines, cement, or drilling fluid`)
        $("#t2 .row-3").children('td:nth-child(2)').html("Check that the site has been drilled with adequate coverage and to the correct depths.")

        $("#t2 .row-0").children('th:nth-child(3)').html("Justification")
        $("#t2 .row-1").children('td:nth-child(3)').html("A BCOC is required prior to any type of ground disturbance in BC. BCOC provides valuable information regarding existing off-site and some on-site utilities prior to drilling. Results of BCOC and as-built plans form a strong basis for utility location, prior to finalizing safe drilling sites.")
        $("#t2 .row-2").children('td:nth-child(3)').html("Once the research has been considered, a conservative approach may be taken if artesian conditions may be present. This might include proactively incorporating measures that mitigate flowing artesian conditions into the monitoring well design or preparing to control artesian flows should they be encountered during drilling. If sufficient gaps in data exist, the engineering/geoscience professional on record managing the project should consider the eventualities related to both controlled and uncontrolled flowing artesian wells.")

        $("#t2 .row-0").children('th:nth-child(4)').html("Revised Risk")
        $("#t2 .row-1").children('td:nth-child(4)').html("3/5").css("background-color", "yellow")
        $("#t2 .row-2").children('td:nth-child(4)').html("1/5").css("background-color", "lime")
        $("#t2 .row-3").children('td:nth-child(4)').html("2/5").css("background-color", "greenyellow")

        $("#t2 .row-0").children('th:nth-child(5)').html("Applicable?")
        $("#t2 .row-1").children('td:nth-child(5)').html("<input type='checkbox'>")
        $("#t2 .row-2").children('td:nth-child(5)').html("<input type='checkbox'>")
        $("#t2 .row-3").children('td:nth-child(5)').html("<input type='checkbox'>")
 
            
        insertRemark("When drilling in areas where artesian conditions are known to exist, a review of the proposed drill depths / locations / proposed well screen lengths should be carried out by an appropriately qualified and experienced Professional Registrant and/or project manager. Although the submission of well construction reports to the Comptroller of Water Rights is not required for certain classes of wells (such as monitoring wells and temporary dewatering wells), if artesian conditions are encountered, then a well construction report must be submitted.")

        insertSelection({'title': "Independent Review Requirement"});

        insertSignature();
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

//------------------------------------------------------ SELECTION FUNCTIONALITY ------------------------------------------------------//

function insertSelection(input) {
    console.log("INSERTING SELECTION")
    console.log("INPUT: ", input)
    $( "#memo" ).append(`
        <tr class="selection-container ui-sortable-handle" id=\'selc`+selections+`\'>
            <td colspan='100%' class='section'>
                <button onclick=deleteSection(`+selections+`)>x</button>
                <div contenteditable placeholder="Selection Header" class="selection-header" style= "font-weight:bold" id=selh`+selections+`>`+input['title']+`</div>
                <table>
                    <tr>
                        <td>
                            <label><input type='radio' value='' name='indep_review'><b>None</b></label><br><br>
                            <label><input type='radio' value='' name='indep_review'><b>Type 1: </b>Carried out by an appropriately qualified and experienced Professional Registrant with no prior involvement in the Professional Activities or Work. Professional of Record and Firm have extensive experience with the type and scale of the High-Risk Professional Activities or Work (HRPAW), there are no innovative or particularly complex aspects of the HRPAW, or the HRPAW only involves problems with well-defined solutions.</label><br><br>
                            <label><input type='radio' value='' name='indep_review'><b>Type 2: </b>Carried out by an appropriately qualified and experienced Professional Registrant with no prior involvement in the Professional Activities or Work. Professional of Record and Firm have less experience with the type and scale of the HRPAW, there are innovative or particularly complex aspects of the HRPAW, or the HRPAW involves problems without well- defined solutions. Type 2 Independent Review will usually be required for HRPAW involving new and emerging technologies.</label>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `)
    selections++;
}

function changeSelection(event, id) {
    console.log(event.target.value)
    console.log("#seld"+id)
    $("#seld"+id).html(event.target.value);
}

function deleteSelection(id) {
    $( "#selc"+id).remove();
}

//------------------------------------------------------ SIGNATURE FUNCTIONALITY ------------------------------------------------------//

function insertSignature() {
    $( "#memo" ).append(`
        <tr class="signature-container ui-sortable-handle" id=\'sic`+signatures+`\'>
            <td colspan='100%'>
                <button onclick=deleteSignature(`+signatures+`)>x</button></br>

                <table>
                    <tr>
                        <td><div contenteditable/>Yours truly, </div>
                    </tr>
                    <tr>
                        <td colspan='50%' class="signature">
                            <div contenteditable style="font-weight:bold">GeoPacific Consultants Ltd.</div>
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
                <span class='table-control'>
                <button onclick=deleteTable(`+tables+`)>x</button>
                Columns <button onclick= delColumn(\'t`+tables+`\') >-</button><button onclick= addColumn(\'t`+tables+`\') >+</button>
                Rows <button onclick= delRow(\'t`+tables+`\') >-</button><button onclick= addRow(\'t`+tables+`\') >+</button>
                </span>
                <span style="text-align:center; font-weight: bold" contenteditable id = \'th`+tables+`\'>Table `+(tables+1)+`</span>
                <table id = \'t`+tables+`\' class = 'content-table' contenteditable>

                    <tr class='row-0'> 
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr> 
                    <tr class='row-1'>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>
                </table>
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
    var rows = $( "#"+tableId+" tbody").children().length;
    console.log("ROWS: ", rows)

    var cols = $( "#"+tableId+" tr:last-child").children().length;
    var new_row = "<tr class= 'row-"+rows+"'>"
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

//------------------------------------------------------ REMARK FUNCTIONALITY ------------------------------------------------------//
function insertRemark(r) {
    $( "#memo" ).append(`
        <tr class="remark-container ui-sortable-handle" id=\'r`+remarks+`\'>
            <td colspan='100%' class='remark'>
                <button onclick=deleteRemark(`+remarks+`)>x</button></br>
                <div id = r`+remarks+` contenteditable style="text-align: center; border: 2px solid #000000; font-weight:bold">`+r+`</div>

            </td>
        </tr>
    `)
    enableTab("r"+remarks)
    remarks++;
}

function deleteRemark(id) {
    $( "#r"+id).remove();
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

// make risk type selector dymanic in size
function enableRiskSelectorListener() {
    const select = document.getElementById('risk-selector')

    select.addEventListener('change', (event) => {
      let tempSelect = document.createElement('select'),
          tempOption = document.createElement('option');
    
      tempOption.textContent = event.target.options[event.target.selectedIndex].text;
      tempSelect.style.cssText += `
          visibility: hidden;
          position: fixed;
          `;
      tempSelect.appendChild(tempOption);
      event.target.after(tempSelect);
      
      const tempSelectWidth = tempSelect.getBoundingClientRect().width;
      console.log(tempSelect)
      console.log(tempSelectWidth)
      event.target.style.width = `${tempSelectWidth-10}px`;
      tempSelect.remove();
    });
    
    select.dispatchEvent(new Event('change'));
}

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

