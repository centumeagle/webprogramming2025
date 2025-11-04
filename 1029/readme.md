# 웹 프로그래밍 핵심 요약: HTML DOM과 이벤트

---

## 8장: HTML DOM과 Document 객체

### 1. HTML DOM(Document Object Model)의 이해
[cite_start]**DOM의 목적**은 웹 페이지에 작성된 **HTML 태그**의 출력 모양이나 콘텐츠를 **자바스크립트**를 통해 제어하는 것입니다[cite: 1100].

* **DOM 객체 생성**: 웹 페이지의 HTML 태그 하나당 하나의 **DOM 객체**가 생성됩니다. [cite_start]이는 DOM 트리의 노드(Node) 또는 엘리먼트(Element)라고도 불립니다[cite: 1098, 1107, 1108, 1109].
* [cite_start]**DOM 트리**: HTML 태그의 포함 관계에 따라 DOM 객체들의 **트리 구조**가 형성되며, 이는 부모-자식 관계를 가집니다[cite: 1104, 1105].
* [cite_start]**`document` 객체**: DOM 트리의 **루트(Root)** 역할을 하며, HTML 문서를 나타내는 객체입니다[cite: 1153].
* [cite_start]**브라우저 처리 과정**: 브라우저는 HTML 태그를 읽고 DOM 객체를 생성하며, DOM 객체가 변경되면 해당 HTML 태그의 출력 모양을 즉시 갱신합니다[cite: 1159, 1160, 1162].

### 2. DOM 객체의 구성 요소

[cite_start]DOM 객체는 HTML 태그의 요소를 반영하여 5가지 요소로 구성됩니다[cite: 1205]:
* [cite_start]**프로퍼티 (Property)**: HTML 태그의 속성(attribute)을 반영합니다[cite: 1209].
* [cite_start]**메소드 (Method)**: DOM 객체를 제어하는 멤버 함수입니다[cite: 1211].
* [cite_start]**컬렉션 (Collection)**: 자식 DOM 객체의 주소 등을 가지는 집합입니다[cite: 1213].
* [cite_start]**이벤트 리스너 (Event Listener)**: HTML 태그에 작성된 이벤트 리스너를 반영합니다[cite: 1190].
* [cite_start]**CSS3 스타일**: `style` 프로퍼티를 통해 HTML 태그의 CSS3 스타일을 제어할 수 있습니다[cite: 1208].

### 3. 주요 DOM 객체 다루기

| 기능 | 메소드/프로퍼티 | 설명 |
| :--- | :--- | :--- |
| **DOM 객체 찾기** | `document.getElementById("id")` | [cite_start]`id` 속성으로 하나의 DOM 객체를 찾습니다. [cite: 936] |
| | `document.getElementsByTagName("tag")` | [cite_start]태그 이름으로 DOM 객체들의 컬렉션을 찾습니다. [cite: 1003] |
| | `document.getElementsByClassName("class")` | [cite_start]`class` 속성으로 DOM 객체들의 컬렉션을 찾습니다. [cite: 1008] |
| **콘텐츠 변경** | `DOM.innerHTML` | [cite_start]시작 태그와 종료 태그 사이의 HTML 콘텐츠를 수정하여 화면 출력을 변경합니다. [cite: 953] |
| **스타일 변경** | `DOM.style.propertyName` | CSS3 스타일 프로퍼티를 동적으로 변경합니다. (예: `background-color` 대신 `backgroundColor` 사용) [cite_start][cite: 936] |
| **동적 구성** | `document.createElement("tag")` | [cite_start]새로운 DOM 객체를 생성합니다. [cite: 1064] |
| | `parent.appendChild(child)` | [cite_start]새로운 DOM 객체를 부모 객체의 자식으로 추가합니다. [cite: 1049] |
| **문서 출력** | `document.write("text")` | HTML 콘텐츠를 출력합니다. [cite_start]문서 로딩 완료 후 사용 시 기존 내용을 지우고 출력합니다. [cite: 1032] |

---

## 9장: 이벤트 기초 및 활용

### 1. 이벤트 개요
[cite_start]**이벤트**는 마우스 클릭, 키보드 입력, 문서/이미지 로딩 완료 등 사용자의 행위나 브라우저 상태 변화를 자바스크립트 코드에게 알리는 **통지(notification)**입니다[cite: 1642]. [cite_start]**이벤트 리스너**는 이 발생한 이벤트에 대처하기 위해 작성된 자바스크립트 코드입니다[cite: 1643].

* [cite_start]**이벤트 종류**: HTML5에서는 약 70여 가지가 있으며, 리스너 이름은 이벤트 이름 앞에 **`on`**을 덧붙입니다 (예: `click` → `onclick`)[cite: 1645, 1646].
* [cite_start]**주요 이벤트 예시**: `load`, `click`, `keydown`/`keyup`, `mouseover`/`mouseout`, `onfocus`/`onblur` 등[cite: 1651, 1677, 1683, 1487, 1572, 1573].

### 2. 이벤트 리스너 작성 방법 (4가지)

[cite_start]이벤트 리스너는 다음 4가지 방법으로 등록할 수 있습니다[cite: 1690]:

1.  [cite_start]**HTML 태그 내 작성**: HTML 태그의 이벤트 리스너 속성(예: `onclick`)에 코드를 직접 작성합니다[cite: 1691, 1695].
2.  **DOM 객체 프로퍼티 이용**: DOM 객체의 이벤트 리스너 프로퍼티에 함수 이름을 등록합니다. [cite_start]이 방식은 하나의 이벤트에 하나의 리스너만 등록 가능합니다[cite: 1730, 1737].
    ```javascript
    p.onmouseover = over; [cite_start]// over() 함수 등록 [cite: 1737]
    ```
3.  **`addEventListener()` 메소드 이용**: `DOM.addEventListener(eventName, listener, [useCapture])`를 사용합니다. [cite_start]**이벤트 흐름(캡쳐/버블)** 단계를 지정할 수 있으며, 하나의 이벤트에 여러 리스너를 등록할 수 있습니다[cite: 1785, 1786, 1789, 1790].
    ```javascript
    p.addEventListener("mouseover", over); [cite_start]// over() 함수 등록 [cite: 1793]
    ```
4.  [cite_start]**익명 함수 이용**: 함수 이름 없이 함수의 코드를 작성하여 프로퍼티 또는 `addEventListener()`에 등록합니다[cite: 1834].

### 3. 이벤트 객체 및 흐름

#### 이벤트 객체
[cite_start]이벤트가 발생할 때 생성되며, 발생한 이벤트에 관련된 다양한 정보(마우스 좌표, 키 코드 등)를 담고 리스너 함수로 전달됩니다[cite: 1845, 1423].
* [cite_start]**주요 프로퍼티**: 이벤트의 종류(`e.type`), 이벤트를 유발시킨 DOM 객체(`e.target`), 현재 이벤트를 받은 DOM 객체(`e.currentTarget`) 등이 있습니다[cite: 1425].
* [cite_start]**`preventDefault()`**: 이벤트의 **디폴트 행동** (예: 링크 클릭 시 페이지 이동, 체크박스 체크)을 강제 취소하는 메소드입니다[cite: 1438, 1439].

#### 이벤트 흐름 (Event Flow)
[cite_start]이벤트가 발생하면 `window` 객체에서 시작하여 DOM 트리를 따라 타겟 객체로 전달되었다가 다시 `window` 객체로 되돌아가는 과정입니다[cite: 1440].
1.  **캡쳐 단계 (Capturing Phase)**: 이벤트가 `window`에서 시작하여 **타겟 객체로 하강**하는 단계입니다. [cite_start]`addEventListener()`의 세 번째 인수를 `true`로 설정하여 리스너를 등록합니다[cite: 1440, 1789].
2.  **버블 단계 (Bubbling Phase)**: 이벤트가 타겟 객체에서 시작하여 `window` 객체로 **상승**하는 단계입니다. [cite_start]`addEventListener()`의 세 번째 인수를 `false` (디폴트)로 설정하여 리스너를 등록합니다[cite: 1440, 1790].
