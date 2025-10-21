# 📘 자바스크립트와 코어 객체의 배열 요약

## 🧩 1. 자바스크립트 개요
자바스크립트(JavaScript)는 **웹 브라우저에서 실행되는 프로그래밍 언어**로, HTML/CSS와 함께 웹의 핵심 기술이다.  
**동적 동작**, **이벤트 처리**, **DOM 조작**이 가능하다.

**특징**
- 인터프리터 언어 (컴파일 불필요)  
- 동적 타입, 객체 기반  
- 함수가 일급 객체  
- 이벤트 중심 프로그래밍 가능

---

## 🧠 2. 코어 객체(Core Object)
자바스크립트가 기본 제공하는 **내장 객체**들.

| 객체 | 설명 | 예시 |
|------|------|------|
| Object | 기본 객체형 | `{name:"Lee"}` |
| Array | 배열 저장 | `[1,2,3]` |
| String | 문자열 처리 | `"hi".toUpperCase()` |
| Number | 숫자 처리 | `(3.14).toFixed(1)` |
| Math | 수학 계산 | `Math.sqrt(9)` |
| Date | 날짜/시간 | `new Date()` |

---

## 📚 3. 배열(Array) 객체
**배열**은 여러 데이터를 **순서대로 저장**하는 객체로,  
**크기가 동적**이고 **자료형이 섞여도** 가능하다.

```javascript
// ✅ 배열 생성
let fruits = ["apple", "banana", "cherry"];
let arr1 = [1, 2, 3];
let arr2 = new Array(4, 5, 6);

// ✅ 주요 속성 & 메서드
let arr = [10, 20, 30];

console.log(arr.length);      // 배열 길이
arr.push(40);                 // 끝에 추가
arr.pop();                    // 끝 요소 제거
arr.unshift(0);               // 앞에 추가
arr.shift();                  // 앞 요소 제거
arr.indexOf(20);              // 인덱스 찾기
arr.includes(10);             // 포함 여부
arr.sort();                   // 정렬
arr.reverse();                // 순서 반전
arr.join(",");                // 문자열 변환
arr.concat([4,5]);            // 배열 병합

// ✅ 고차함수 예시
arr.forEach(x => console.log(x));          // 반복
let doubled = arr.map(x => x * 2);         // 변환
let filtered = arr.filter(x => x > 10);    // 조건 필터
let sum = arr.reduce((a,b)=>a+b,0);        // 누적합

