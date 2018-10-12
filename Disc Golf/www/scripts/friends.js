var friends = [];

function LoadFriends() {

    GetItemFromStorageWithCallBack("friends", function (value) {        
        friends = value;
        PopulateFriends();
    });   

}

function PopulateFriends() {

    var friend = document.getElementById("friendList");
    while (friend.firstChild) {
        friend.removeChild(friend.firstChild);
    };

    var friendUIArray = [];

    for (var i = 0; i < friends.length; i++) {        
        friendUIArray.push('<li name="' + friends[i].name + '" class="ui-li ui-btn-up-c" style="white-space: normal;text-overflow: clip;"><a style="font-size:100%;white-space: normal;text-overflow: clip;" a onclick="EditFriend(' + i + ')">' + friends[i].name + '</a><a onclick="DeleteFriend(\'' + friends[i].name + '\')"></a></li>');        
    }

    $('#friendsBlock').children('ul').append(friendUIArray.join('')).listview().listview('refresh');
}

function NewFriend() {
    ShowPopup("#NewFriend");
}

function SaveFriend() {    
    //Grab Values
    var friendName = document.getElementById("newFriendName").value;
    var friendEmail = document.getElementById("newFriendEmail").value;
    var friendAbbrev = document.getElementById("newFriendAbbreviation").value;
    
    //Clear Values
    document.getElementById("newFriendName").value = '';
    document.getElementById("newFriendEmail").value = '';
    document.getElementById("newFriendAbbreviation").value = '';

    var newFriend = new Friend();
    newFriend.name = friendName;
    newFriend.email = friendEmail;
    newFriend.abbrev = friendAbbrev;

    friends.push(newFriend);    

    SetItemInStorage("friends", friends);
    PopulateFriends();
    PopulateOptionsForFriendsDropDowns();

    return false;
}

function SaveFriendInGame() {
    //Grab Values
    var friendName = document.getElementById("newFriendNameInGame").value;
    var friendEmail = document.getElementById("newFriendEmailInGame").value;
    var friendAbbrev = document.getElementById("newFriendAbbreviationInGame").value;
    //Clear Values
    document.getElementById("newFriendNameInGame").value = '';
    document.getElementById("newFriendEmailInGame").value = '';
    document.getElementById("newFriendAbbreviationInGame").value = '';

    var newFriend = new Friend();
    newFriend.name = friendName;
    newFriend.email = friendEmail;
    newFriend.abbrev = friendAbbrev;
    
    friends.push(newFriend);
    SetItemInStorage("friends", friends);    
    PopulateOptionsForFriendsDropDowns();
    currentSelect.value = friendName;
    $("#NewFriendInGame").popup("close");    

    AddPlayer();    
    return false;
}

function PopulateOptionsForFriendsDropDowns() {

    for (i = 2; i <= 4; i++) {
        $('#select-Player' + i + ' option').remove();
        $('#select-PlayerInGame' + i + ' option').remove();
        $('#select-Player' + i).append('<option data-placeholder="true">Select Player</option>');
        $('#select-PlayerInGame' + i).append('<option data-placeholder="true">Select Player</option>');
    }

    for (var f = 0; f < friends.length; f++) {        
        for (i = 2; i <= 4; i++) {
            $('#select-Player' + i).append('<option value="' + friends[f].name + '">' + friends[f].name + '</option>');
            $('#select-PlayerInGame' + i).append('<option value="' + friends[f].name + '">' + friends[f].name + '</option>');
        }                    
    }

    for (i = 2; i <= 4; i++) {
        $('#select-Player' + i).append('<option value="New">Add Player</option>');
        $('#select-PlayerInGame' + i).append('<option value="New">Add Player</option>');
    }    

    if ($("#select-Player2").parent().hasClass('ui-select')) {
        $("#select-Player2").selectmenu('refresh', true);
        $("#select-Player3").selectmenu('refresh', true);
        $("#select-Player4").selectmenu('refresh', true);
    }
    else {
        $("#select-Player2").trigger('create');
        $("#select-Player3").trigger('create');
        $("#select-Player4").trigger('create');
    }    
    if ($("#select-PlayerInGame2").parent().hasClass('ui-select')) {
        $("#select-PlayerInGame2").selectmenu('refresh', true);
        $("#select-PlayerInGame3").selectmenu('refresh', true);
        $("#select-PlayerInGame4").selectmenu('refresh', true);
    }
    else {
        $("#select-PlayerInGame2").trigger('create');
        $("#select-PlayerInGame3").trigger('create');
        $("#select-PlayerInGame4").trigger('create');
    }
}

var editingFriendIndex = -1;

function EditFriend(i) {    
    editingFriendIndex = i;
    var friendName = friends[i].name;
    var friendEmail = friends[i].email;
    var friendAbbrev = friends[i].abbrev;
    
    document.getElementById("editFriendName").value = friendName;
    document.getElementById("editFriendEmail").value = friendEmail;
    document.getElementById("editFriendAbbreviation").value = friendAbbrev;
    
    ShowPopup("#EditFriend");
}

function UpdateFriend() {   
    friends[editingFriendIndex].name = document.getElementById("editFriendName").value;
    friends[editingFriendIndex].email = document.getElementById("editFriendEmail").value;
    friends[editingFriendIndex].abbrev = document.getElementById("editFriendAbbreviation").value;
    editingFriendIndex = -1;
    SetItemInStorage("friends", friends);
    PopulateFriends();
    PopulateOptionsForFriendsDropDowns();
    CloseEditFriendsInPlayers();
    return false;    
}

function DeleteFriend(friendName) {    
    var index = -1;
    for (var f = 0; f < friends.length; f++) {
        if (friends[f].name == friendName) {
            index = f;
            break;
        }
    }

    if (index > -1) {
        friends.splice(index, 1);
    }
    
    SetItemInStorage("friends", friends);
    PopulateFriends();
}

function CloseFriendsInGame() {
    $("#NewFriendInGame").popup("close");
    ClosePopup();
}

function CloseEditFriendsInPlayers() {
    $("#EditFriend").popup("close");
    ClosePopup();
}

function CloseFriendsInPlayers() {
    $("#NewFriendPlayer").popup("close");
    ClosePopup();
}

function CloseFriends() {
    $("#NewFriend").popup("close");
    ClosePopup();
}

function SaveFriendPlayer() {
    //Grab Values
    var friendName = document.getElementById("newFriendNamePlayer").value;
    var friendEmail = document.getElementById("newFriendEmailPlayer").value;
    var friendAbbrev = document.getElementById("newFriendAbbreviationPlayer").value;
    //Clear Values
    document.getElementById("newFriendNamePlayer").value = '';
    document.getElementById("newFriendEmailPlayer").value = '';
    document.getElementById("newFriendAbbreviationPlayer").value = '';

    var newFriend = new Friend();
    newFriend.name = friendName;
    newFriend.email = friendEmail;
    newFriend.abbrev = friendAbbrev;

    friends.push(newFriend);
    SetItemInStorage("friends", friends);
    PopulateFriends();

    //Get existing drop down values

    var drop2 = $("#select-Player2").val();
    var drop3 = $("#select-Player3").val();
    var drop4 = $("#select-Player4").val();
    var drop5 = $("#select-Player5").val();

    PopulateOptionsForFriendsDropDowns();

    //Need to set the select menus back to the options they had before 
    $("#select-Player2").val(drop2);
    $("#select-Player3").val(drop3);
    $("#select-Player4").val(drop4);
    $("#select-Player5").val(drop5);

    currentSelect.value = friendName;
    $("#select-Player2").selectmenu('refresh', true);
    $("#select-Player3").selectmenu('refresh', true);
    $("#select-Player4").selectmenu('refresh', true);
    $("#select-Player5").selectmenu('refresh', true);

    $("#NewFriendPlayer").popup("close");
    ClosePopup();

    return false;
}