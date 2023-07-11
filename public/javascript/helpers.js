
function getobj(elementId){
	return document.getElementById(elementId);
}


function isnull(inValue){
	if (inValue===null){
		return '';
	}
	return inValue;
}


function basepath() {
	var basep='<?php echo (basepath()); ?>';
	return basep;
} 


function copyElementToClipboard(element){
	if (navigator.clipboard) {
		navigator.clipboard.writeText(element.value).then(function() {
		console.log('Async: Copying to clipboard was successful!');
		}, function(err) {
		console.error('Async: Could not copy text: ', err);
		});
	} else {
		element.focus();
		element.select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Copying text command was ' + msg);
		} catch (err) {
			console.log('Oops, unable to copy');
		}	
	}		
}

function makeElem(type) {
	const elemToCreate = document.createElement(type);
	return elemToCreate;
}

function signout(){
	window.location.assign("<?php echo (basepath(). 'controller/logout.php'); ?>");
}


function getScrollPercent(element) {
	var percentage=(element.scrollTop/(element.scrollHeight - element.offsetHeight))*100;
	return(Math.round(percentage));
}


function validateEmail(email) {	
	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return email.match(regex);
}

function loadSelectElement(reply){
/*
	request must have these 2 set
	request['returnExtensions']='1';
	request['columnsToReturn']='"referenceMeaning", "referenceCd","display", "activeInd"';

*/
	var innerHTML=(reply['info']['request']['unEncryptedRequest']['defaultOption'])?reply['info']['request']['unEncryptedRequest']['defaultOption']:'';
	var key;
	var extensionKey;
	var showInDropDowns;
	var selected;
	var dataset;
	for (key in reply['reply']){
		showInDropDowns=true;
		selected='';
		if (reply['reply'][key]['extensions']){
			for (extensionKey=0;extensionKey<reply['reply'][key]['extensions'].length;extensionKey++){
				if (reply['reply'][key]['extensions'][extensionKey]['referenceExtensionName']=='hideInDropDowns') showInDropDowns=false;
				if (reply['reply'][key]['extensions'][extensionKey]['referenceExtensionName']=='defaultDropDowns') selected=' selected ';
			}
		}
		if ((reply['reply'][key]['activeInd']==1) && showInDropDowns) {
			dataset='';
			if (reply['reply'][key]['extensions']){
				for (extensionKey=0;extensionKey<reply['reply'][key]['extensions'].length;extensionKey++){
					dataset+=' data-'+reply['reply'][key]['extensions'][extensionKey]['referenceExtensionName'].toLowerCase()+' = "'+reply['reply'][key]['extensions'][extensionKey]['referenceExtensionValue']+'" ';
				}
			}
			innerHTML+='<option '+ dataset+
							' class="' + reply['info']['tableName']+ reply['reply'][key]['referenceMeaning'] + '" ' +
							' value="' + reply['reply'][key]['referenceMeaning'] + '" ' +
							' id = "' + reply['reply'][key]['referenceCd'] + '" ' + selected + 
							'> ' +
							reply['reply'][key]['display'] + 
							'</option>';
		}
	}	
	getobj(reply['info']['tableName']).innerHTML=innerHTML;
}


function logError(logEntry){
	var request={};
	request['unEncryptedRequest']={};
	request['unEncryptedRequest']=logEntry;
	$.ajax({ 
		type: "POST",     
		url: basepath()+'model/logError.php',
		data: request,
		dataType:"json", 
		success: function(result) {
				if (result.status != 'SUCCESS'){
					alert("Error logging the error");
					debugger;
					return;
				}			
			} 
		});	
}

function doNothing(reply){
}

function windowReload(reply){
	window.location.reload();
}

function updateTable(tableName, request={}){
	var tableId=getobj(tableName);
	if (tableId.dataset.fetchingData==1) return; //we're already in the middle of a call to this function
	if (tableId.dataset.moreToGet==0) return; //we've already gotten all the rows
	tableId.dataset.fetchingData=1;
	var updatedRequest={};
	updatedRequest['currentTop']=Number(tableId.dataset.currentTop);
	updatedRequest['pageSize']=Number(tableId.dataset.pageSize);
	updatedRequest['unEncryptedRequest']=JSON.parse(tableId.dataset.request); 	
	if (tableId.dataset.encryptedRequest){
		updatedRequest['encryptedRequest']=tableId.dataset.encryptedRequest;
	}
	tableId.dataset.startTime=Date.now();
	$.ajax({ 
		type: "POST",
		url: tableId.dataset.modelFile,
		data: updatedRequest,
		dataType:"json", 
		success: function(result) {			
			tableId.dataset.fetchingData=0;
			result['info']={};
			result['info']['startTime']=tableId.dataset.startTime;  
			result['info']['tableName']=tableName;
			result['info']['modelFile']=tableId.dataset.modelFile;
			result['info']['request']=updatedRequest;
			result['info']['endTime']=Date.now();
			if (result.status && result.status == 'FAIL'){
				logError(result);
				alert("request failed \n modelFile: " + tableId.dataset.modelFile + 
						"\n request: " + tableId.dataset.request + 
						"\n reply: " + JSON.stringify(result));
				debugger;
				return;
			}
			if (result.status && result.status == 'INVALIDUSER'){
				//alert('Your session has expired');
				//window.location.assign('index.php');
				swal({
					closeOnClickOutside: true,
					title: 'Session Expired',
					text: "Your session has expired. Please refresh.",
					icon: "warning",
					buttons: {
					  confirm: {
						text: "Refresh",
						value: "confirm",
						visible: true,
						className: "",
						closeModal: true
					  },
					}
				}).then((result) => {
					if(result == "confirm") {
						window.location.assign('index.php');
					}
				});
				return;
			}
			
			tableId.dataset.encryptedRequest=result.encryptedRequest;
			//change the pagination things here
			tableId.dataset.moreToGet=0;
			if (tableId.dataset.pageSize>0 && result.status == 'SUCCESS' && result.rowsReturned==tableId.dataset.pageSize){
				tableId.dataset.moreToGet=1;
				var currentTop=Number(tableId.dataset.currentTop);
				tableId.dataset.currentTop=currentTop+Number(result.rowsReturned);
			}
			if (tableId.dataset.passBack>''){
				result['passBack']=JSON.parse(tableId.dataset.passBack);
			}
			if (typeof window[tableId.dataset.replyFunction]==='function'){
				window[tableId.dataset.replyFunction](result);
			}else {
				alert('function ' + tableId.dataset.replyFunction + ' does not exist tableName: ' + tableName);
				debugger;
			}
		} 
	});	
}

function groupConsoleLogger(name='', reply) {
	if ('1' == '1'){
		console.group(name);
		let repVar = reply.reply;
		console.groupCollapsed("Raw reply:");
		Object.keys(reply).forEach(function (item) {
			if(item != 'reply') console.log(item+' => ', reply[item]);
		});
		console.groupEnd();
		if(!reply.reply.hasOwnProperty('0')) {
			Object.keys(reply.reply).forEach(function (replyItem) {
				console.group(replyItem);
					console.log(reply.reply[replyItem]);
				console.groupEnd();
			});
		} else {
			repVar.forEach((rep)=> {
				console.log(rep);
			});
		}
		console.groupEnd();
	}
}

var getStackTrace = function() {
	var obj = {};
	Error.captureStackTrace(obj, getStackTrace);
	var stck = obj.stack.replace("Error\n", "");
	stck = stck.replace("\n", "");
	return stck;
};

function loadTable(tableName, modelFile, request, pageSize, replyFunction){	
	try{
		var stacker = getStackTrace();
		if(stacker.includes("<anonymous>") && !stacker.includes("jquery")) {
			console.group("Stop trying to hack us please and thank you");
				console.log("ne te quaesiveris extra");
			console.groupEnd();
			return;
		}
	} catch(err) {
		console.log(err);
	}
	var tableId=getobj(tableName);
	tableId.dataset.pageSize=pageSize;
	tableId.dataset.currentTop=0;
	tableId.dataset.encryptedRequest='';
	tableId.dataset.request=JSON.stringify(request);	
	tableId.dataset.fetchingData=0;
	tableId.dataset.moreToGet=1;
	tableId.dataset.modelFile=modelFile;
	tableId.dataset.passBack=(request['passBack'])?tableId.dataset.passBack=JSON.stringify(request['passBack']):'';
	tableId.dataset.replyFunction=replyFunction;
	updateTable(tableName, request);
}


function getGUID(element){
	var request={};
	$.ajax({ 
		type: "POST",     
		url: '<?php echo(basepath()); ?>model/getUUID.php',
		data: request,
//		async: false,
		dataType:"json", 
		success: function(result) {
//			debugger;
			element.value=result.uuid;
			} 
		});	
}


function uncheckAllChildren(parentId){
	var key2;
	for (key2 in parentId.children){
		if (parentId.children[key2].tagName == 'INPUT'){
			parentId.children[key2].checked=false;
		}
	}
}

function convertTimestampToLocal(inTimestamp){
	var d=new Date(inTimestamp + ' UTC');
	return d.toLocaleString();
}


	
function initializeEditor(holder, articleData='{}') {
	// pass in the name of the element for the argument named "holder"
	// pass in the persisted string of json data saved in the table
	editor = new EditorJS({
		holder:holder,
		tools: {
			header: {
				class: Header,
				inlineToolbar: ['link']
			},
			list: {
				class: List,
				inlineToolbar: true
			},
			image: {
			  class: ImageTool,
			  config: {
				endpoints: { 
				  byFile: '<?php echo(basepath()); ?>model/uploadEditorFile.php'
				}
			  }
			},
			embed: Embed,
			list: {
			  class: NestedList,
			  inlineToolbar: true,
			}
		},
		data: JSON.parse(articleData)
	});			
	
	return editor;
}


function parseEditorPromise(promise) {
	var parsedElements = JSON.stringify(edjsParser.parse(promise));
	var parsedData = JSON.stringify(promise);
	returnValue = {
		elements: parsedElements,
		data: parsedData
	}
	return returnValue
}

function setupQuillText(textContainerName, onChangeFunction='', textValue=''){
		var textContainer=getobj(textContainerName);
		textContainer.innerHTML='';
		var quill = new Quill(textContainer, {
		theme: 'snow',
		modules: {
		toolbar: {
		  container: [
			[{
			  font: []
			}],
			[{
			  header: [false, 1, 2, 3, 4, 5, 6]
			}],
			["bold", "italic", "underline", "strike"],
			[{
			  align: []
			}],
			["blockquote", "code-block"],
			[{
			  list: "ordered"
			}, {
			  list: "bullet"
			}, {
			  list: "check"
			}],
			[{
			  indent: "-1"
			}, {
			  indent: "+1"
			}],
			[{
			  color: []
			}, {
			  background: []
			}],
			["link", "image", "video"],
			["clean"],
			["showHtml"]
		  ],
		  handlers: {
			showHtml: () => {
			  if (quill.txtArea.style.display === "") {
				const html = quill.txtArea.value;
				if (html === '<p><br/></p>') {
				  quill.html = null;
				} else {
				  quill.html = html.replace(new RegExp('<p><br/>', 'g'), '<p>')
				}
				quill.pasteHTML(html);
			  }
			  quill.txtArea.style.display =
				quill.txtArea.style.display === "none" ? "" : "none";
			}
		  }
		}
		}
		});
//		quill.root.innerHTML=textValue;
		if (Quill.prototype.getHTML == undefined)
		Quill.prototype.getHTML = function() {
		return this.container.firstChild.innerHTML;
		};
		//fix for Quill v2
		if (Quill.prototype.pasteHTML == undefined)
		Quill.prototype.pasteHTML = function(html) {
		{
		  this.container.firstChild.innerHTML = html;
		}
		}

		quill.txtArea = document.createElement("textarea");
		quill.txtArea.style.cssText =
		"width: 100%;margin: 0px;background: rgb(29, 29, 29);box-sizing: border-box;color: rgb(204, 204, 204);font-size: 15px;outline: none;padding: 20px;line-height: 24px;font-family: Consolas, Menlo, Monaco, &quot;Courier New&quot;, monospace;position: absolute;top: 0;bottom: 0;border: none;display:none;resize: none;";

		var htmlEditor = quill.addContainer("ql-custom");
		htmlEditor.appendChild(quill.txtArea);

		quill.on("text-change", (delta, oldDelta, source) => {  
		var html = quill.getHTML();
		quill.txtArea.value = html;
		if (onChangeFunction>'' && source=='user' && (typeof window[onChangeFunction]==='function') && delta!=oldDelta) window[onChangeFunction](html);
		});

		quill.txtArea.value = quill.getHTML();
	//getobj(textContainerName).innerHTML = textValue;
	return quill;
}

function removeClassFromClass(classToFind, classToRemove){
	var elements=document.getElementsByClassName(classToFind);
	for (var i=0;i<elements.length;i++){
		elements[i].classList.remove(classToRemove);
	}
}


function addClassToClass(classToFind, classToAdd){
	var elements=document.getElementsByClassName(classToFind);
	for (var i=0;i<elements.length;i++){
		elements[i].classList.add(classToAdd);
	}
}



function setHTMLForClass(classToFind, innerHTML){
	var elements=document.getElementsByClassName(classToFind);
	for (var i=0;i<elements.length;i++){
		if (elements[i].tagName=='INPUT' || elements[i].tagName=='SELECT'){
			elements[i].value=innerHTML;
		} else {
			elements[i].innerHTML=innerHTML;
		}
	}
}


function setCheckedForClass(classToFind, setToChecked){
	var elements=document.getElementsByClassName(classToFind);
	for (var i=0;i<elements.length;i++){
		elements[i].checked=setToChecked;
	}
}

function getCheckedForClass(classToFind){
	var elements=document.getElementsByClassName(classToFind);
	var checkedElements=[];
	for (var i=0;i<elements.length;i++){
		if (elements[i].checked) checkedElements.push(elements[i]);
	};
	return checkedElements;
}




function setDisplayForClass(classToFind, display){
	var elements=document.getElementsByClassName(classToFind);
	for (var i=0;i<elements.length;i++){
		elements[i].style.display=display;
	}
}


function removeElementsForClass(classToFind){
	var elements=document.getElementsByClassName(classToFind);
	for (var i=elements.length-1;i>=0;i--){
		elements[i].remove();
	}
}


function swapClasses(oldClass, newClass){
	var elements=document.getElementsByClassName(oldClass);
	for (var i=0;i<elements.length;i++){
		elements[i].classList.add(newClass);
	}
	while (elements[0]){
		elements[0].classList.remove(oldClass);
	}
}


function timeSinceSeconds(thenSeconds) {
	var d = new Date();
	var nowSeconds = Math.round(d.getTime() / 1000);
	var seconds = nowSeconds-thenSeconds;
	var interval = Math.floor(seconds / 31536000);
	if (interval > 1) {return interval + " years ago";}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {return interval + " months ago";}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {return interval + " days ago";}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {return interval + " hours ago";}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {return interval + " minutes ago";}
	return 'Just now';
}



function timeSince(date) {
//	var dayPassed = new Date(date);
	var dayPassed = new Date(convertTimestampToLocal(date));
	var seconds = Math.floor((new Date() - dayPassed) / 1000);
	var interval = Math.floor(seconds / 31536000);
	if (interval > 1) {return interval + " years ago";}
	interval = Math.floor(seconds / 2592000);
	if (interval > 1) {return interval + " months ago";}
	interval = Math.floor(seconds / 86400);
	if (interval > 1) {return interval + " days ago";}
	interval = Math.floor(seconds / 3600);
	if (interval > 1) {return interval + " hours ago";}
	interval = Math.floor(seconds / 60);
	if (interval > 1) {return interval + " minutes ago";}
	return "Just Now";
}


function stringToEpochTime(timeStr, formatStr='yyyy-MM-dd'){
	//timeStr yyyy-mm-dd
	if (timeStr>''){
		var utcDate=luxon.DateTime.fromFormat(timeStr, formatStr, {zone: 'local'});
		return utcDate.toSeconds();
	}
	return '';
}


function epochTimeToString(mode, epochTime1Str, epochTime2Str='', timeZoneName=''){
	var epochTime1;
	if (epochTime1Str>''){
		epochTime1=luxon.DateTime.fromSeconds(Number(epochTime1Str));
	} else {
		epochTime1=luxon.DateTime.fromSeconds(Date.now()/1000);
	}
	if (timeZoneName>'') {
		epochTime1=epochTime1.toLocal().setZone(timeZoneName); 
	} else {
		epochTime1=epochTime1.toLocal(); 
	}
	if (epochTime2Str>''){
		var epochTime2=luxon.DateTime.fromSeconds(Number(epochTime2Str)-1);
		if (timeZoneName>'') {
			epochTime2=epochTime2.toLocal().setZone(timeZoneName); 
		} else {
			epochTime2=epochTime2.toLocal(); 
		}
	}
	switch (mode){
		case 'DATETIMERANGE': 
			return epochTime1.toLocaleString({ year:'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'}) + ' - ' + epochTime2.toLocaleString({ hour: '2-digit', minute: '2-digit' });
			break;
		case 'DATEONLYRANGE': 
			return epochTime1.toLocaleString({ year:'numeric', month: 'short', day: '2-digit' }) + ' - ' + epochTime2.toLocaleString({ year:'numeric', month: 'short', day: '2-digit' });
			break;
		case 'TIMEONLYRANGE': 
			return epochTime1.toLocaleString({ hour: '2-digit', minute: '2-digit' }) + ' - ' + epochTime2.toLocaleString({ hour: '2-digit', minute: '2-digit' });
			break;
		case 'DATEONLY': 
			return epochTime1.toLocaleString({ year:'numeric', month: 'short', day: '2-digit' });
			break;
		case 'TIMEONLY': 
			return epochTime1.toLocaleString({ hour: '2-digit', minute: '2-digit' });
			break;
		case 'DATETIME': 
			return epochTime1.toLocaleString({ year:'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
			break;
		case 'DATEINPUT': 
			return epochTime1.toFormat('yyyy-MM-dd');
			break;
		case 'TIMEINPUT': 
			return epochTime1.toFormat('HH:mm');
			break;
		case 'TIMEONLYWITHSECONDS': 
			return epochTime1.toLocaleString({ hour: '2-digit', minute: '2-digit', second: '2-digit' });
			break;
	}
	
}


function formatNumber(inValue, precision=0, returnIfNull=''){
	if (inValue==null) return returnIfNull;
	var outValue=Number(inValue);
	return (outValue.toLocaleString('en-US', {maximumFractionDigits:precision, minimumFractionDigits:precision, userGrouping:true}));
}


function formatHours(inValue, precision=0, returnIfNull=''){
	return formatNumber(inValue, precision, returnIfNull);
}


function formatPercent(inValue, precision=0, returnIfNull=''){
	if (inValue==null) return returnIfNull;
	var outValue=Number(inValue);
	return (outValue.toFixed(precision) + '%');
}


function formatDollars(inValue, precision=2, returnIfNull=''){
	if (inValue==null) return returnIfNull;
	var outValue=Number(inValue);
	
	if(outValue < 0) {
		outValue = '-$'+Math.abs(outValue).toLocaleString('en-US', {maximumFractionDigits:precision, minimumFractionDigits:precision, userGrouping:true})
	} else {
		outValue = '$'+outValue.toLocaleString('en-US', {maximumFractionDigits:precision, minimumFractionDigits:precision, userGrouping:true})
	}
//	return (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',  maximumSignificantDigits: precision }).format(outValue));
	return outValue;
}


function packParameters(parameters){
	var parametersJSON=JSON.stringify(parameters);
	var parametersEncoded=btoa(parametersJSON);
	return parametersEncoded;
}

function goTo(page) {
	window.location.assign(page);
}


function parametersRedirect(fileName, parameters) {
	window.location.assign(fileName+'?parameter='+packParameters(parameters));
}

function unpackParameters(parametersEncoded){
	if (!(parametersEncoded>'')) return '';
	var parametersJSON=atob(parametersEncoded);
	var parameters=JSON.parse(parametersJSON);
	return parameters;
}


function extractObjectToArray(extractObject, extractTarget){
	var returnValue=[];
	for(var i=0;i<extractObject.length;i++){
		returnValue.push(extractObject[i][extractTarget]);
	}
	return returnValue;
}


function createCSVFile(rows){
	let csvContent = "data:text/csv;charset=utf-8,";

	rows.forEach(function(rowArray) {
		let row = rowArray.join('","');
		csvContent+='"'+row+'"'+"\r\n";
	});
	return encodeURI(csvContent);
}


function getLocalTimeZone(){
	var local = luxon.DateTime.local();
	return(local.zoneName); //=> 'America/New_York'	
}


function createPermaLink(sourceStr){
	var newDis = sourceStr.toLowerCase().replace(' ', '-');
	newDis = newDis.replace(' ', '-');
	newDis = newDis.replace(' ', '-');
	newDis = newDis.replace(' ', '-');
	newDis = newDis.replace(' ', '-');
	newDis = newDis.replace("'", "\'");
	return newDis;
}



var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    },
	iOSPWA: function() {
		const standaloneDisplay = ('standalone' in window.navigator) && (window.navigator.standalone);
		return (standaloneDisplay && isMobile.iOS());
	}
};


function addClickListenersByClass(classNameArray) {
	classNameArray.forEach( className => {
		addClickListener(className);
	});
}

function addClickListener(elementClassName) {
	var elementArray = document.querySelectorAll(elementClassName);
	elementArray.forEach(el => {
		el.addEventListener('keypress', event => {
			triggerOnclick(event);
		});
		el.setAttribute('tabindex', '0');
	});		
}

function triggerOnclick(event) {
	if(event.code == "Enter"){
		event.srcElement.click();			
	}
}


function makeClickable() {
	var clickableElements = document.querySelectorAll('[onclick]');
	console.log(clickableElements);
	
	clickableElements.forEach(el => {
		el.addEventListener('keypress', event => {
			triggerOnclick(event);
		});
		el.setAttribute('tabindex', '0');
	});		
}

function val(id) {
	return getobj(id).value;
}

function setVal(id, value) {
	getobj(id).value = value;
}

/* Class Observer Functions */

class ClassWatcher {
	constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
		this.targetNode = targetNode
		this.classToWatch = classToWatch
		this.classAddedCallback = classAddedCallback
		this.classRemovedCallback = classRemovedCallback
		this.observer = null
		this.lastClassState = targetNode.classList.contains(this.classToWatch)

		this.init()
	}
	init() {
		this.observer = new MutationObserver(this.mutationCallback)
		this.observe()
	}
	observe() {
		this.observer.observe(this.targetNode, { attributes: true })
	}
	disconnect() {
		this.observer.disconnect()
	}
	mutationCallback = mutationsList => {
		for(let mutation of mutationsList) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
				let currentClassState = mutation.target.classList.contains(this.classToWatch)
				if(this.lastClassState !== currentClassState) {
					this.lastClassState = currentClassState
					if(currentClassState) {
						this.classAddedCallback(this.targetNode)
					}
					else {
						this.classRemovedCallback(this.targetNode)
					}
				}
			}
		}
	}
}


function workOnClassAdd(elem) {
	elem.parentNode.querySelector('label').classList.add('notValid');
	elem.addEventListener("change", watchForChange, {once: true});
	//alert("I'm triggered when the class is added");
}


function workOnClassRemoval(elem) {
	elem.parentNode.querySelector('label').classList.remove('notValid');
	//alert("I'm triggered when the class is removed");
}


function watchForChange(event) {
	if(event.target.value!= '' && event.target.value != 'ALL') {
		event.target.classList.remove('notValid');
	}
}
// add the following to your page

/*

let inputsToWatch = document.querySelectorAll('*__ Inputs To Select __*');
inputsToWatch.forEach((inp)=>{
	let classWatcher = new ClassWatcher(inp, 'notValid', workOnClassAdd, workOnClassRemoval);
});

*/