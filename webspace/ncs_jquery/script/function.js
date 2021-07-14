function setList() {

    console.log(members);
    // console.log(JSON.stringify(members));
    // localStorage.setItem('members', JSON.stringify(members));

    // table 의 tbody 캐스팅
    var list = $('#list');

    var tbody = '<tr>';
    tbody += '  <th>순번(index)</th>';
    tbody += '  <th>아이디</th>';
    tbody += '  <th>비밀번호</th>';
    tbody += '  <th>이름</th>';
    tbody += '  <th>관리</th>';
    tbody += '</tr>';

    if (members.length < 1) {

        tbody += '<tr>';
        tbody += '<td colspan="5">데이터가 존재하지않습니다.</td>';
        tbody += '</tr>';


    } else {

        for (var i = 0; i < members.length; i++) {
            tbody += '<tr>';
            tbody += '  <td>' + i + '</td>';
            tbody += '  <td>' + members[i].userid + '</td>';
            tbody += '  <td>' + members[i].pw + '</td>';
            tbody += '  <td>' + members[i].username + '</td>';
            tbody += '  <td> <a href="javascript:editMember(' + i + ')">수정</a> |' +
                '<a href="javascript:deleteMember(' + i + ')">삭제</a></td>';
            tbody += '</tr>';
        }
    }
    list.html(tbody);
}

// 배열의 요소 삭제 함수
function deleteMember(index) {


    if (confirm('삭제하시겠습니까?')) {
        members.splice(index, 1);
        alert('삭제되었습니다.');

        // 저장
        localStorage.setItem('members', JSON.stringify(members));

        // 테이블 리스트를 갱신
        setList();
    }

}


// 배열의 요소 수정 함수
function editMember(index) {

    // 수정 폼 영역이 노출되어야 한다!
    $('#editFormArea').css('display', 'block');
    // editForm의 태그들의 value  값을 세팅
    var editUserId = $('#editId');
    var editPw = $('#editPw');
    var editRePw = $('#editRePw');
    var editName = $('#editName');
    var editIndex = $('#index');

    // 이전 데이터를 폼에 세팅
    editUserId.val(members[index].userid);
    editPw.val(members[index].pw);
    editRePw.val(members[index].pw);
    editName.val(members[index].username);
    editIndex.val(index);

    $('#editForm').submit(function () {

        // 비밀번호와 비밀번호 확인이 같은지 체크
        if (editPw.val() != editRePw.val()) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return false;
        }

        if (!(regCheck(2, editUserId.val().trim()))) {
            alert('아이디는 이메일 형식으로 입력해주세요');
            return false;
        }
        ;

        if (!(regCheck(0, editName.val().trim()))) {
            alert('한글과 영문으로 입력해주세요.');
            return false;
        }
        ;

        if (!(regCheck(1, editPw.val().trim()))) {
            alert('비밀번호는 대소문자, 숫자가 있어야합니다.');
            return false;
        }
        ;


        if (!confirm('수정하시겠습니까?')) {
            return false;
        }

        members[editIndex.val()].pw = editPw.val();
        members[editIndex.val()].username = editName.val();

        // 저장
        localStorage.setItem('members', JSON.stringify(members));

        alert('수정되었습니다.');

        // 테이블 세팅
        setList();

        editMemberClose();

        return false;
    });

}

function editMemberClose() {
    document.querySelector('#editFormArea').style.display = 'none';
}

function regCheck(index, string) {

    reg = [/([가-힣]|[a-z])/g, [/[a-z]/g, /[A-Z]/g, /[0-9]/g], [/\w+@\w+\.\w+/]];

    if (index == 0) {

        var replacedString = string.replace(reg[index], '');

        if (!(replacedString.length == 0)) {
            return false;
        } else {
            return true;
        }

    } else {

        for (var i = 0; i < reg[index].length; i++) {
            if (reg[index][i].test(string)) {
            } else {
                return false;
            }
        }

        return true;
    }

}


