function testUpdateTable() {
	if(getobj('allUsersDiv').dataset.moreToGet == 'false') return;
	updateFetchTable('allUsersDiv')
	.then(data => {
		processUsers(data);
	});
}

var globals = {};
globals['columnInputs'] = getobj('columnsPopulate').querySelectorAll('[type="checkBox"]');

globals['columnInputs'].forEach(inp => {
	inp.addEventListener('change', e => {
		setDisplayForClass(inp.dataset.column+'Hide', (e.target.checked)?'table-cell': 'none');
	})
});

function processUsers(data) {
	data.forEach(u => {
		const row = makeElem('tr');
		row.id=u.userId;
		
		const editUser = 'window.location.assign(\'adminUser/'+u.userId+'\');';
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
	});
}

function getUsers(){
	getobj('addUserDiv').style.display='none';
	getobj('allUsersDiv').style.display='block';

	getobj('usersTable').innerHTML='';
	
	var request={};
	request.columnsToReturn = ['userId', 'firstName', 'lastName', 'email', 'fullName', 'statusCdMeaning', 'userTypeCdMeaning', 'userTypeCdDisplay', 'statusCdDisplay', 'bksTestColumn'];

	fetchTable('allUsersDiv', 'users/getUser', request, 2)
	.then(data => {
		processUsers(data);
		console.log(data);
	});
}

getUsers();