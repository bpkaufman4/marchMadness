
var globals = {};
var tableToClick = '';

document.addEventListener("click", (evt) => {
	const flyoutEl = getobj('columnsPopulate');
	let targetEl = evt.target; // clicked element      
	do {
		if(targetEl == flyoutEl || (targetEl.classList && targetEl.classList.contains('columnsButton') && getobj('columnsButton').dataset.status == 'collapsed') || (targetEl.classList && targetEl.classList.contains('showColumnsList'))) {
			getobj('columnsPopulate').style.left = ''+(getobj('columnsButton').getBoundingClientRect().left)+'px';
			getobj('columnsPopulate').style.display = "block";
			getobj('columnsButton').dataset.status = 'expanded';
			return;
		}
			// Go up the DOM
		targetEl = targetEl.parentNode;
	} while (targetEl);
	// This is a click outside.      
	getobj('columnsPopulate').style.display = 'none';
	getobj('columnsButton').dataset.status = 'collapsed';
});

function exportTable() {
	request = {};
	request['exportColumns'] = [];
	
	let columns = getobj('columnsPopulate').querySelectorAll('.columnCheckInput');
	console.log(columns);
	for(let i = 0; i < columns.length; i++) {
		if(columns[i].checked) request['exportColumns'].push(columns[i].dataset.column);		
	}
	request['orderBy']=getobj('sortSelect').value;
	request['searchStr']=getobj('searchStr').value;
	request['includeDeleted']=(getobj('includeDeleted').checked)?1:0;
	if (getobj('showActiveOnly').checked) request['statusCdMeaning']='ACTIVE';
	request['useCaseId']='ed646fde-f8b1-11ed-99a3-895f422f262e';
	loadTable('exportSelect', 'model/exportUserTable.php', request, 0, 'processExportUserTable');
}

function processExportUserTable(reply) {
	console.log(reply);
	const link = makeElem('a');
	link.href = reply.reply['fileNameURL'];
	link.download = 'users.csv';
	link.click();
}

Dropzone.options.profilePictureUpload =
	{
	acceptedFiles: "image/*",
	maxFilesize: 1024,
	maxFiles: 1,
	uploadMultiple:false,
	dictDefaultMessage: "Drop file here or click to upload (1GB Max File Size)",
	createImageThumbnails:false,
	parallelUploads: 1,
	chunking: true,
	forceChunking: true,
	chunkSize: 1000000,
	parallelChunkUploads: false,
	retryChunks: true, 
	retryChunksLimit: 3,
	chunksUploaded: function(file, done){
//        invoked when all chunks are uploaded
		if (file.upload.progress==100){
			//customAlertBox('File Uploaded Succesfully', 'good', false);
			swal("File uploaded successfully", {
				icon: "success",
			}) 
			var replyJSON=file.xhr.response;
			var reply=JSON.parse(replyJSON);
			//reply.localNamePath is the temporary file name with a localBasepath
			//reply.urlNamePath is the temporary file name with basepath
			getobj('localNamePath').value=reply.localNamePath;
			getobj('urlNamePath').value=reply.urlNamePath;
			getobj('profilePhotoURL').style.backgroundImage='url(\''+reply.urlNamePath+'\')';
			getobj('profilePhotoURL').innerHTML = '';
			profilePictureUpload(reply);
		} else {
			//customAlertBox('Error uploading file','bad',false);
			swal("Error uploading file", {
				icon: 'warning'
			})
		}
		done();
	},
	init: function()
				{
					var myDropzone = this; // closure                    
					this.on("error",
						function(file, errorMessage) {
							// invoked when something goes wrong
							swal('Something went wrong ' + errorMessage, {
								icon: 'warning'
							});
						}
					);
					this.on("addedfile",
						function(file) {
							getobj('localNamePath').value='';
						}
					);
				} 
	};

function profilePictureUpload(reply) {
	console.log(reply);
}

function processLoadPopup(reply) {
	console.log(reply);
	const u = reply.reply[0];
	console.log(u);
	getobj('userId').value = u.userId;
	getobj('email').value = u.email;
	getobj('firstName').value = u.firstName;
	getobj('lastName').value = u.lastName;
	getobj('fullName').value = u.fullName;
	getobj('userTypeSelect').value = u.userTypeCdMeaning;
	getobj('userStatusSelect').value = u.statusCdMeaning;
	if(u.profilePhotoURL > '') {
		getobj('profilePhotoURL').style.backgroundImage = 'url(\''+u.profilePhotoURL+'\')';
		getobj('profilePhotoURL').innerHTML = '';
	} else {
		getobj('profilePhotoURL').style.backgroundImage = 'unset';
		getobj('profilePhotoURL').innerHTML = '<i class="material-icons" onclick="getobj(\'profilePictureUpload\').click();" style="font-size: 50px; padding: 22px;">add_a_photo</i>';
	}
}

function saveNewTableView(id='') {
	
	if(getobj('newTableName').value == '' && id == '') {
		customAlertBox('Please enter a table name', 'bad');
		return;
	}
	var columnsToSave = [];
	
	const potentialColumns = getobj('columnsPopulate').querySelectorAll('[type="checkBox"]')
	
	var processFunction = (id > '')?'processSaveCustomTable':'processAddCustomTable';
	
	potentialColumns.forEach(inp => {
		if(inp.checked == true) {
			columnsToSave.push(inp.dataset.column);
		}
	});
	var request = {};
	request['customTableId'] = id;
	request['columnsJSON'] = JSON.stringify(columnsToSave);
	request['useCaseId']='54e01d99-f8a0-11ed-99a3-895f422f262e';
	request['tableName'] = getobj('newTableName').value;
	request['tableUseCaseId'] = '284d9c31-5c4a-11ed-8b2d-17cec369c293';
	loadTable('saveNewTable', 'model/putCustomTable.php', request, 0, processFunction);
	
	getobj('newTableName').value = '';
}

function processSaveCustomTable(reply) {
	customAlertBox('Table saved', 'good', false);
}

function processAddCustomTable(reply) {
	console.log(reply);
	const ct = reply.reply[0];
	const tableTab = makeElem('div');
	tableTab.classList.add('tableTab');
	tableTab.dataset.columns = ct.columnsJSON;
	tableTab.dataset.customTableId = ct.customTableId;
	tableTab.setAttribute('onclick', 'openTable(this, event);')
	tableTab.innerHTML = '<div>'+ct.tableName+'<i class="material-icons close"  style="margin-top: -1px;" data-custom-table-id="'+ct.customTableId+'" id="CLOSE'+ct.customTableId+'" onclick="deleteTable(this);">close</i></div>';
	getobj('customTables').append(tableTab);
	tableTab.click();
}

function openTable(element, event) {
	if(event.target.classList.value.includes('close')) {
		return;
	}
	setDisplayForClass('SHOWALL', 'none');
	removeClassFromClass('tableTab', 'active');
	setCheckedForClass('columnCheckInput', false);
	setDisplayForClass('SAVETABLESHOW', 'inline-block');
	
	sessionStorage.setItem(variablePrefix+"UsersTableToClick", element.dataset.customTableId);
	getobj('saveCurrentTable').dataset.customTableId = element.dataset.customTableId;
	element.classList.add('active');
	
	const columnsToShow = JSON.parse(element.dataset.columns);
	
	tableToClick = element.dataset.customTableId;
	
	columnsToShow.forEach(c => {
		var classToShow = c + 'Hide';
		setDisplayForClass(classToShow, 'table-cell');
		let query = '[data-column="' + c +'"]';
		getobj('columnsPopulate').querySelector(query).checked = true;
	});
}

function showAllColumns(element) {
	setDisplayForClass('SHOWALL', 'table-cell');
	removeClassFromClass('tableTab', 'active');
	element.classList.add('active');
	sessionStorage.removeItem(variablePrefix+'UsersTableToClick');
	setCheckedForClass('columnCheckInput', true);
}

function deleteTable(element) {
	var request = {};
	request['useCaseId']='65064f9e-f8a7-11ed-99a3-895f422f262e';
	request['customTableId'] = element.dataset.customTableId;
	loadTable(element.id, 'model/deleteCustomTable.php', request, 0, 'processDeleteCustomTable');
}

function processDeleteCustomTable(reply) {
	console.log(reply);
	getobj(reply.info.tableName).parentNode.parentNode.remove();
	getobj('accountsTabs').querySelector('[data-custom-table-id="0"]').click();
	tableToClick = '';
}

function getTables(reply) {
	const customTables = reply.customTables;
	
	customTables.forEach(ct => {
		const tableTab = makeElem('div');
		tableTab.classList.add('tableTab');
		tableTab.dataset.columns = ct.columnsJSON;
		tableTab.dataset.customTableId = ct.customTableId;
		tableTab.setAttribute('onclick', 'openTable(this, event);')
		tableTab.innerHTML = '<div>'+ct.tableName+'<i class="material-icons close"  style="margin-top: -1px;" data-custom-table-id="'+ct.customTableId+'" id="CLOSE'+ct.customTableId+'" onclick="deleteTable(this);">close</i></div>';
		getobj('customTables').append(tableTab);
	});
	
	if(firstLoad && sessionStorage.getItem(variablePrefix+"UsersTableToClick") > '') {
		tableToClick = sessionStorage.getItem(variablePrefix + "UsersTableToClick");
	}
	
	if(tableToClick > '') {
		let query = '[data-custom-table-id="'+tableToClick+'"]';
		getobj('accountsTabs').querySelector('[data-custom-table-id="'+tableToClick+'"]').click();
	}
	
	firstLoad = false;
}

function clearAllInputs(userId=''){
	if (userId>''){
		var request = {};
		request['userId'] = userId;
		request['useCaseId']='be138686-aef6-11ed-8770-0c9ff800156b';
		loadTable('fullName', 'model/getUser.php', request, 0, 'processLoadPopup');
	} else {
		getobj('userId').value='';
		getobj('email').value='';
		getobj('firstName').value='';
		getobj('lastName').value='';
		getobj('fullName').value='';
		getobj('profilePhotoURL').style.backgroundImage = 'unset';
		getobj('profilePhotoURL').innerHTML = '<i class="material-icons" onclick="getobj(\'profilePictureUpload\').click();" style="font-size: 50px; padding: 22px;">add_a_photo</i>';
	}
	getobj('password').value='';		
	getobj('confirmPassword').value='';		
}



function processPutUser(reply){
	console.log(reply);
	if (reply.status!='SUCCESS'){
		fancyAlertBox('Error', 'bad', false);
		debugger;
		return;
	}
	if (reply['reply'] && reply.reply['newUser']==1){
		fancyAlertBox('Email sent to ' + reply.reply['email'] + '', 'good', false);
	}
//	debugger;
	getUsers();
}


function processPasswordReset(reply){
	if (reply.status!='SUCCESS'){
		fancyAlertBox('Error', 'bad', false);
		debugger;
		return;
	}
	fancyAlertBox('Email sent to ' + getobj('email').value + '', 'good', false);
}


function putUser(){
	var request={};
	request['userId']=getobj('userId').value;
	request['email']=getobj('email').value;
	request['userTypeCdMeaning']=getobj('userTypeSelect').value;	
	request['statusCdMeaning']=getobj('userStatusSelect').value;	
	request['firstName']=getobj('firstName').value;
	request['lastName']=getobj('lastName').value;
	request['fullName']=getobj('firstName').value+' '+getobj('lastName').value;
	request['pwd']=getobj('password').value;
	request['profilePictureURL'] = getobj('urlNamePath').value;
	request['profilePictureLocal'] = getobj('localNamePath').value;
	request['useCaseId']='62bc89d3-562f-11ed-8b2d-17cec369c293';
	loadTable('currentUsersDiv','model/putUser.php', request, 0, 'processPutUser');
}


function addUser(mode, userId=''){
	var request={};
	switch(mode){
		case 'CANCEL':
			getobj('addUserDiv').style.display='none';
			getobj('allUsersDiv').style.display='block';
			break;
		case 'SAVE':
			if (getobj('password').value > '' && getobj('password').value!=getobj('confirmPassword').value){
				fancyAlertBox('Passwords must match', 'bad', false);
				return;
			}
			putUser();
			break;
		case 'CREATE':
			clearAllInputs();
			getobj('addUserDiv').style.display='block';
			getobj('passwordResetButton').style.display='none';
			getobj('allUsersDiv').style.display='none';
			break;
		case 'EDIT':
			clearAllInputs(userId);
			getobj('addUserDiv').style.display='block';
			getobj('passwordResetButton').style.display='block';
			getobj('allUsersDiv').style.display='none';
			break;
		case 'DELETE':
			swal({
				title: 'Press OK to delete '+getobj(userId).dataset.fullName + '.',
				icon: "warning",
				buttons: true
			})
			.then((willDelete) => {
				if(willDelete) {
					request['userId']=userId;
					request['statusCdMeaning']='DELETED';	
					request['useCaseId']='ee46b5e0-562f-11ed-8b2d-17cec369c293';
					loadTable('currentUsersDiv','model/putUser.php', request, 0, 'getUsers');
				}
			});
/*
			if (confirm('Delete user "' + getobj(userId).dataset.fullName  + '?')){
				request['userId']=userId;
				request['statusCdMeaning']='DELETED';	
				loadTable('currentUsersDiv','model/putUser.php', request, 0, 'getUsers');
			} 
*/
			break;
		case 'ACTIVE':
			request['userId']=userId;
			request['statusCdMeaning']='ACTIVE';	
			request['useCaseId']='ee46b5e0-562f-11ed-8b2d-17cec369c293';
			loadTable('currentUsersDiv','model/putUser.php', request, 0, 'getUsers');
			break;
		case 'PASSWORD':
			request['email']=getobj('email').value;
			loadTable('currentUsersDiv','model/passwordReset.php', request, 0, 'processPasswordReset');
			break;
	}
}

function getMoreUsers(element){
	if (getScrollPercent(element) == 100){
		updateTable(element.id);
	}
}

var firstLoad = true;
var globals = {};
globals['columnInputs'] = getobj('columnsPopulate').querySelectorAll('[type="checkBox"]');

globals['columnInputs'].forEach(inp => {
	inp.addEventListener('change', e => {
		setDisplayForClass(inp.dataset.column+'Hide', (e.target.checked)?'table-cell': 'none');
	})
})

var userPage = 1;

function getUsers(reset = false){
	if(reset) userPage = 1;
	var request={};
	getobj('addUserDiv').style.display='none';
	getobj('allUsersDiv').style.display='block';
	const columnsToReturn = ['userId', 'firstName', 'lastName', 'email', 'fullName', 'statusCdMeaning', 'userTypeCdMeaning', 'userTypeCdDisplay', 'statusCdDisplay'];
	const limit = 25;
	const page = userPage;
	request = {columnsToReturn, limit, page};

	fetch('api/users/getUsers', {
        method:'post',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
	.then(data => {
		console.log(data);
		data.forEach(u => {
			const row = makeElem('tr');
			row.id=u.userId;
			
			const editUser = 'addUser(\'EDIT\', \''+u.userId+'\');';
			const activeUser = 'addUser(\'ACTIVE\', \''+u.userId+'\');';
			const deleteUser = 'addUser(\'DELETE\', \''+u.userId+'\');';
			
			const name = makeElem('td');
			name.classList.add('fullNameHide', 'SHOWALL');
			name.setAttribute('tabindex', 0);
			name.setAttribute('onclick', editUser);
			name.innerText = u.fullName;
			row.appendChild(name);
			
			const email = makeElem('td');
			email.classList.add('emailHide', 'SHOWALL');
			email.setAttribute('onclick', editUser);
			email.innerText = u.email;
			row.appendChild(email);
			
			const userType = makeElem('td');
			userType.classList.add('userTypeCdMeaningHide', 'SHOWALL')
			userType.setAttribute('onclick', editUser);
			userType.innerText = u.userTypeCdDisplay;
			row.appendChild(userType);
			
			const userStatus = makeElem('td');
			userStatus.classList.add('statusCdMeaningHide', 'SHOWALL');
			userStatus.setAttribute('onclick', editUser);
			userStatus.innerText = u.statusCdDisplay;
			row.appendChild(userStatus);
			
			const deleteColumn = makeElem('td');
			deleteColumn.setAttribute('tabindex', 0);
			deleteColumn.setAttribute('onclick', (u.statusCdMeaning == 'DELETED')?activeUser:deleteUser);
			
			const deleteIcon = makeElem('i');
			deleteIcon.classList.add('material-icons');
			deleteIcon.innerText = (u.statusCdMeaning == 'DELETED')?'undo':'delete';
			
			deleteColumn.appendChild(deleteIcon);
			row.appendChild(deleteColumn);
			
			usersTable.appendChild(row);
			userPage++;
		});
	});
}

getUsers();