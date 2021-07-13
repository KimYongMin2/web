
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


            if(!(regCheck(2,id.val().trim()))){
                $('#userID+div.msg').html('아이디는 이메일 형식으로 입력해주세요').css('display', 'block');
                return false;
            };

            if(!(regCheck(0, name.val().trim()))){
                $('#userName+div.msg').html('이름은 한글과 영문으로 입력해주세요.').css('display', 'block');
                return false;
            };

            if(!(regCheck(1,pw.val().trim()))){
                $('#pw+div.msg').html('비밀번호는 대소문자, 숫자가 있어야합니다.').css('display', 'block');
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



