var selectedEmployee;
var employeeData;
var cardsHTML;
var modalHTML;
var searchField;


employees = [];
$.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=gb,us,es,br',
    dataType: 'json',
    success: function (data) {
        employees = data.results;
        displayEmployees();
    }
});

function displayEmployees() {
    cardsHTML = '<ul class="cards">';
    $.each(employees, function (i, employee) {
        cardsHTML += '<li class="employee" id="' + i + '">';
        cardsHTML += '<img class="avatar" src="' + employee.picture.large + '" alt="' + employee.name.first + ' ' + employee.name.last + '">';
        cardsHTML += '<div class="employee-info">';
        cardsHTML += '<div class="info employee-name"> <strong class="name">' + employee.name.first + ' </strong>';
        cardsHTML += '<strong class="name">' + employee.name.last + '</strong> </div>';
        cardsHTML += '<span class="info login">' + employee.login.username + '</span>';
        cardsHTML += '<span class="info location">' + employee.location.city + '</span>';
        cardsHTML += '</div> </li>';
        $('#directory').html(cardsHTML);
    });
    cardsHTML += '</ul>';
}


function setupModal() {
    employeeData = employees[selectedEmployee];
    modalHTML = '<a href="#" class="close-button close-button-modal"></a>\n' +
                '<a href="#" class="switch switch-back">&nbsp;</a>\n' +
                '            <ul class="modal-list modal-user-info">\n' +
                '                <li>\n' +
                '                    <img class="avatar" src="' + employeeData.picture.medium + '" alt="' + employeeData.name.first + ' ' + employeeData.name.last + '">\n' +
                '                </li>\n' +
                '                <li class="employee-name">\n' +
                '                    <strong class="name">' + employeeData.name.first + '</strong>\n' +
                '                    <strong class="name">' + employeeData.name.last + '</strong>\n' +
                '                </li>\n' +
                '                <li>\n' +
                '                    <a class="info email login" href="' + employeeData.email + '">' + employeeData.email + '</a>\n' +
                '                </li>\n' +
                '                <li>\n' +
                '                    <span class="info login">' + employeeData.login.username + '</span>\n' +
                '                </li>\n' +
                '                <li>\n' +
                '                    <span class="info location">' + employeeData.location.city + '</span>\n' +
                '                </li>\n' +
                '            </ul>\n' +
                '            <ul class="modal-list modal-user-contact">\n' +
                '                <li class="info">' + employeeData.cell + '</li>\n' +
                '                <li class="info">' + employeeData.location.street +' '+ employeeData.location.city +' '+ employeeData.nat + ' ' + employeeData.location.postcode + '</li>\n' +
                '                <li class="info">Birthday: ' + new Date(employeeData.dob).toLocaleDateString('en-GB') + '</li>\n' +
                '            </ul>\n' +
                '            </ul>\n' +
                '<a href="#" class="switch switch-forth">&nbsp;</a>';
    $('.modal-content').html(modalHTML);

    if (selectedEmployee === 11) {
        $('.switch-forth').css({display: 'none'});
    } else if (selectedEmployee === 0) {
        $('.switch-back').css({display: 'none'});
    }
}


//open the modal box
$(document).on("click", '.employee', function(e) {
    $('#modal').removeClass('hidden');
    selectedEmployee = parseInt($(e.target).closest('.employee').attr('id'));
    setupModal();
});

//switch back and forth
$(document).on("click", '.switch', function(e) {
    if ($(e.target).hasClass('switch-back')) {
        selectedEmployee = selectedEmployee - 1;
    } else if ($(e.target).hasClass('switch-forth')) {
        selectedEmployee = selectedEmployee + 1;
    }
    setupModal();
});

//close the modal box
$(document).on("click", '.close-button-modal', function(e) {
    $('#modal').addClass('hidden');
});

//search function
$('#employee-search').keyup(function() {
    $('.employee').css('display', 'none');
    searchField = $('#employee-search').val().toLowerCase();
    $.each(employees, function (i, employee) {
        var a = employee.name.first.toString().includes(searchField);
        var b = employee.name.last.toString().includes(searchField);
        var c = employee.login.username.toString().includes(searchField);
        if (a || b || c) {
            $('#'+i).css('display', 'flex');
        }
    });
});