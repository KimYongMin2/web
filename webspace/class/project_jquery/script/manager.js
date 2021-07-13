
// 회원의 정보를 저장하는 배열
var members = []; // new Array()

// 사용자 입력한 정보를 가지고 Member객체를 생성
// submit  이벤트 연결
$(document).ready(function() {
        //localStorage 저장된 데이터가 있는지 확인
        // localStorage.getItem('members') 없으면 null 반환
        if (localStorage.getItem('members') == null) {
            // 배열 members 를 저장
            localStorage.setItem('members', JSON.stringify(members));
        } else {
            members = JSON.parse(localStorage.getItem('members')); // JSON 문자열 -> 객체로 변환
            console.log(members);
            // 테이블 세팅
            setList();
        }

        var id = $('#userID');
        var pw = $('#pw');
        var repw = $('#repw');
        var name = $('#userName');

        // regForm 캐스팅
        $('#regForm').submit(function () {

            if (id.val().trim().length < 1) {
                $('#userID + .msg').html('필수항목입니다.').css('display', 'block');
                return false;
            }

            if (pw.val().trim().length < 1) {
                $('#pw+div.msg').html('필수항목입니다.').css('display', 'block');
                return false;
            }

            if (repw.val().trim().length < 1) {
                $('#repw+div.msg').html('필수항목입니다.').css('display', 'block');
                return false;
            }

            if (name.val().trim().length < 1) {
                $('#userName+div.msg').html('필수항목입니다.').css('display', 'block');
                return false;
            }

            if (pw.val().trim() != repw.val().trim()) {
                $('#repw+div.msg').html('비밀번호가 일치하지않습니다.').css('display', 'block');
                return false;
            }

            if(!(isName(name.val().trim()))){
                return false;
            };

            if(!(isPassword(pw.val().trim()))){
                return false;
            };

            // 배열에 사용자 정보를 추가
            members.push(new Member(id.val(), pw.val(), name.val()));

            // 저장
            localStorage.setItem('members', JSON.stringify(members));

            alert('등록되었습니다.');
            console.log('회원 리스트', members);

            // form 초기화
            this.reset();

            // 테이블 세팅
            setList();

            return false;
        });
        $(id).focus(function (){
            $('#userID+div.msg').css('display','none').html('');
        });

        $(pw).focus(function (){
            $(' #pw+div.msg ').css('display','none').html('');
        });

        $(repw).focus(function (){
            $('#repw+div.msg').css('display','none').html('');
        });

        $(name).focus(function (){
            $('#userName+div.msg').css('display','none').html('');
        });
});
// 배열에 있는 요소를 -> table tr 행을 만들어서 출력
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


    if(confirm('삭제하시겠습니까?')){
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
    $('#editFormArea').css('display','block');
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

    $('#editForm').submit(function (){

        //var member  = new Member(editUserId.value, editPw.value, editName.value);
        //console.log(editIndex.value , member);

        // 비밀번호와 비밀번호 확인이 같은지 체크
        if(editPw.val() != editRePw.val()){
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            return false;
        }

        if(!confirm('수정하시겠습니까?')){
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

function editMemberClose(){
    document.querySelector('#editFormArea').style.display = 'none';
}

function isName(string){
    var regName = /([가-힣]|[a-z])/g;

    var replacedString = string.replace(regName, '');

    if (!(replacedString.length == 0)){
        $('#userName+div.msg').html('한글과 영문으로 입력해주세요.').css('display', 'block');
        return false;
    }else {
        return true;
    }
}

function isPassword(string){
    var regPasswordCapital = /[a-z]/g;
    var regPasswordSmall = /[A-Z]/g;
    var regPasswordNum = /[0-9]/g;


    if(regPasswordCapital.test(string)){
    }else{
        $('#pw+div.msg').html('비밀번호는 대소문자, 숫자가 있어야합니다.').css('display', 'block');
        return false;
    }

    if(regPasswordSmall.test(string)){
    }else{
        $('#pw+div.msg').html('비밀번호는 대소문자, 숫자가 있어야합니다.').css('display', 'block');
        return false;
    }

    if(regPasswordNum.test(string)){
    }else{
        $('#pw+div.msg').html('비밀번호는 대소문자, 숫자가 있어야합니다.').css('display', 'block');
        return false;
    }

    return true;
}

