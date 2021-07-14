// 회원의 정보 : 아이디, 비밀번호, 이름,  생년월일(년(4자), 월, 일), 성별, 확인이메일, 휴대전화(국적, 번호)
// Member -> 생성자 함수를 정의

function Member(id, pw, name, year, month, day, gender, email, nationality, num) {
    this.userid = id;
    this.pw = pw;
    this.username = name;
    this.birth = [year,month,day]
    this.gender = gender;
    this.email = email;
    this.phoneNum = [nationality, num];
}
