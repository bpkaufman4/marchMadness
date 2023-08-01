function addUser(mode) {
    var request = {};
    switch (mode) {
        case 'SAVE':
            request.userId = getobj('userId').value;
            request.firstName = getobj('firstName').value;
            request.lastName = getobj('lastName').value;
            request.email = getobj('email').value;
            request.statusCdMeaning = getobj('userStatusSelect').value;
            request.userTypeCdMeaning = getobj('userTypeSelect').value;

            fetchTable('passwordResetButton', 'api/users/updateUser', request, 1)
            .then(response => {
                console.log(response);
            });
            break;
    }
}