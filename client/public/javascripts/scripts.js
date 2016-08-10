$(document).ready(function() {
        console.log('working');

        //clicking submit on appy page submits application
        $('form#apply').on('submit', function(event) {
                try {
                        event.preventDefault();
                        console.log('submit works');

                        var data = $(this).serializeArray();
                        console.log(data);
                        data.forEach(function(elem) {
                                if(elem.value != '') {
                                        data[elem.name] = elem.value;
                                }
                        });

                        $.ajax({
                                method: 'POST',
                                url: '/apply',
                                data: data
                        }).done(function() {
                                alert('Thanks for your submission!');
                        });

                } catch (exception) {
                        console.log(exception);
                }

        });

        // Clicking search button on Admin page returns search results
        $('#search').on('click', function(event) {
                try {
                        $.ajax({
                                method: 'GET',
                                url: '/admin/search/' + $('#searchbox').val()
                        }).done(function(applications) {
                                console.log('button works');
                                console.log(applications);
                                renderApps(applications);
                        });
                } catch (exception) {
                        console.log(exception);
                }
        });

});

function renderApps(applications) {

        var $tbody = $('<tbody>');
        var $theader = $('<tr>');
        var $firstNameHead = $('<th>').html('First Name');
        var $lastNameHead = $('<th>').html('Last Name');
        var $desiredLocationHead = $('<th>').html('Desired Location');
        var $lastEmployerHead = $('<th>').html('Last Employer');
        var $skillsHead = $('<th>').html('Skills');
        var $dateAppliedHead = $('<th>').html('Date Applied');

        $theader.append($firstNameHead);
        $theader.append($lastNameHead);
        $theader.append($desiredLocationHead);
        $theader.append($lastEmployerHead);
        $theader.append($skillsHead);
        $theader.append($dateAppliedHead);

        $tbody.html($theader);



        applications.forEach(function(application) {
                var $tr = $('<tr>');
                var $firstName = $('<td>').html(application.firstName);
                var $lastName = $('<td>').html(application.lastName);
                var $desiredLocation = $('<td>').html(application.desiredLocation);
                var $lastEmployer = $('<td>').html(application.empHistory[0].employer);
                var $skills = $('<td>').html(application.skills);
                var $dateApplied = $('<td>').html(application.dateApplied);

                $tr.append($firstName);
                $tr.append($lastName);
                $tr.append($desiredLocation);
                $tr.append($lastEmployer);
                $tr.append($skills);
                $tr.append($dateApplied);

                $tbody.append($tr);
        });

        $('#appTable').html($tbody);

};
