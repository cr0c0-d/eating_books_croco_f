# 책 먹는 악어

<!--프로젝트 대문 이미지-->

![Project Title](/readme/img/banner.jpg)

<!--프로젝트 버튼-->
<!--백엔드 깃허브-->

[![request-back-github-page]][back-github-page-url]

<!-- 백엔드 레포지토리 배지-->

![Back-Repository Commits][back-repository-commit-activity] ![Back-Repository Size][back-repository-size-shield]

<br/>

<!--프론트엔드 깃허브-->

[![request-front-github-page]][front-github-page-url]

<!-- 프론트엔드 레포지토리 배지-->

![Front-Repository Commits][front-repository-commit-activity] ![Front-Repository Size][front-repository-size-shield]

<br />

<!--데모 사이트 배지-->

[![view-demo-eatingbookscroco]][demo-url-eatingbookscroco]

<!--목차-->

# 목차

- [[1] 프로젝트 소개](#1-프로젝트-소개)
  - [제작 동기](#제작-동기)
  - [특징](#특징)
  - [기술 스택](#기술-스택)
- [[2] 구현 기능](#2-구현-기능)
  - [보안 및 인증](#보안-및-인증)
  - [도서 검색 및 정보 조회](#도서-검색-및-정보-조회)
  - [글 작성](#글-작성)
  - [글 조회](#글-조회)
- [[3] 프로젝트 회고 및 개선 사항](#3-프로젝트-회고-및-개선-사항)
- [[4] 연락처](#4-연락처)

<br/>

# [1] 프로젝트 소개

책 먹는 악어는 **읽은 책에 대한 기억을 장기간 보존**하고, 독서 경험을 더 풍부하게 만들어주는 웹 사이트입니다.

책을 읽는 것을 음식을 먹는 것에 비유하여, 독서 전후의 기대와 느낌을 '식전문'과 '식후문'으로 기록하고, 다른 사람들과 공유하거나 개인적인 기록으로 남겨둘 수 있습니다.

<br/>

## 제작 동기

우리는 종종 읽었던 책의 내용을 시간이 지나면 잊어버리곤 합니다.

때로는 그 책이 주는 감동이나 재미는 기억나지만, 구체적으로 어떤 점이 마음을 움직였는지, 어떤 부분이 매력적이었는지 기억나지 않는 경우가 많습니다.

이런 경험 속에서 책을 읽은 후 그 내용을 기록하는 것의 중요성을 느꼈지만, 글을 쓴다는 것은 때로 부담스러운 작업이 될 수 있습니다.

**어떤 부분을 어떻게 기록해야 할지, 무엇을 써야 할지** 고민이 많아지기 때문입니다.

<br/>

"책 먹는 악어"는 이런 생각에서 만들어졌습니다. **책을 읽고 기록하는 것**을 **쉽고 단순한 과정**으로 만드는 것이 목표입니다.

<br/>

## 특징

### 식전문(읽기 전 기록)

책을 읽기 전에 그 책을 선택한 이유, 기대감, 알고 싶은 점 등을 기록할 수 있습니다.

독서 전의 기대감을 기록해놓으면 단순히 '읽어야지' 생각만 하는 것보다 실천으로 이어지기 쉽고, 책의 내용에 더 집중할 수 있으며, 책을 다 읽은 후에 비교해보며 독서의 재미를 더할 수 있습니다.

<br/>

### 템플릿 제공

책을 읽기 전, 읽고 난 후의 느낌과 생각을 쉽게 정리할 수 있는 **템플릿**을 제공합니다.

<br/>

### 다양한 시각 공유

같은 책에 대한 다른 사람들의 식후문을 읽어보며, 다양한 시각과 생각을 확인할 수 있습니다.

또한, 다른 사람의 식후문을 통해 새로운 책에 대한 호기심을 자극받을 수도 있습니다.

<br/>

### 공유 및 비공개 옵션

자신의 식전문과 식후문을 다른 사람들과 공유할 수도 있고, 개인적인 기록으로 남겨두고 싶을 때는 비공개로 설정할 수 있습니다.

<br/>

## 기술 스택

### 백엔드

- ![java]
- ![spring-boot]
- ![spring-security]
- ![jjwt]
- ![spring-data-jpa]
- ![queryDSL]

### 프론트엔드

- ![react]
- ![react-bootstrap]
- ![axios]

### 기타

- ![백엔드배포](https://img.shields.io/badge/데이터베이스-8A2BE2) ![mySql]
- ![백엔드배포](https://img.shields.io/badge/백엔드%20배포-8A2BE2) ![aws]
- ![프론트엔드배포](https://img.shields.io/badge/프론트엔드%20배포-8A2BE2) ![heroku]

 <br/>

# [2] 구현 기능

## 보안 및 인증

- 스프링 시큐리티, JWT: 회원가입 및 로그인 기능 구현

- 액세스 토큰과 리프레시 토큰을 발급하여 보안 강화

- oAuth2 구글 로그인: 구글 계정을 이용한 로그인 기능 제공

<br />

## 도서 검색 및 정보 조회

![img_search](/readme/img/search.gif)

- 도서 판매 사이트 '알라딘'의 API를 활용, 도서 검색 및 상세 정보 조회 기능 구현

<br />

## 글 작성

![img_write](/readme/img/write.gif)

특정 도서에 대한 감상문 작성 기능 구현

- 공개 여부 선택 가능
- 기본 제공 템플릿 활용 작성 / 자유 작성 선택 가능

## 글 조회

### 도서별 글 목록 조회

![img_bookArticles](/readme/img/bookArticles.png)

### 사용자별 글 목록 조회

![img_memberArticles](/readme/img/memberArticles.png)

전체, 도서별, 사용자별 글 목록 조회 기능 구현

<br />

# [3] 프로젝트 회고 및 개선 사항

이 프로젝트는 스프링 부트를 공부하고, 배운 것들을 실제로 구현해보는 것이 목표였습니다.

프로젝트를 진행하며 많은 것을 배웠지만, 몇 가지 아쉬운 점과 개선이 필요한 부분들이 있었습니다.

<br />

## 개발 과정에서 아쉬웠던 점

### 프론트엔드 구현의 어려움

- 문제 상황: 스프링 부트에 대한 학습과 구현을 주 목적으로 시작했으나, 리액트에 익숙하지 않음으로 인해 프론트엔드 개발에 예상보다 많은 시간이 소요되었습니다.

- 결과: 개발 기간이 예상보다 길어졌습니다.

### 외부 API로 인한 로딩 시간 증가

- 문제 상황: 방대한 양의 도서 정보를 전부 데이터베이스에 저장하기는 어려우므로, 개발 당시 도서 정보를 저장하지 않도록 구현하였으나,
  도서 정보를 조회할 때마다 외부 API를 호출하게 되어 로딩 시간이 길어지는 문제가 발생했습니다.

- 고려 중인 개선 방안: 캐싱 또는 일부 인기 도서 정보를 사전에 데이터베이스에 저장하여 로딩 시간을 단축하는 방법을 고려 중입니다.

### 커뮤니티 기능의 부족

- 문제 상황: 보안과 관련된 기술(스프링 시큐리티, JWT, OAuth 등) 학습에 집중하다 보니, 계획했던 커뮤니티 기능 구현에 상대적으로 덜 주목하게 되었습니다.

- 계획 중인 추가 기능 일부:

  - 다른 사람들과 함께 읽기: 사용자들이 그룹을 만들고, 특정 기간 안에 특정 도서를 함께 읽는 목표를 세워 독서 동기를 부여합니다.
  - 즐겨찾기 기능 : 마음에 드는 사용자나 글에 '좋아요' 혹은 즐겨찾기 기능을 제공합니다.
  - 연령별 필터 기능: 사용자의 연령대에 따른 도서 추천 및 리뷰 필터링 기능 등 맞춤형 서비스를 제공합니다.

<br />

# [4] 연락처

- 📧 hyde69ciel@gmail.com
- 📋 [https://cr0c0.tistory.com/](https://cr0c0.tistory.com/)

<!--Url for Badges-->

<!-- 프론트엔드 레포지토리 정보 배지 -->

[front-repository-size-shield]: https://img.shields.io/github/repo-size/cr0c0-d/eating_books_croco_f?labelColor=D8D8D8&color=BE81F7
[front-repository-commit-activity]: https://img.shields.io/github/commit-activity/t/cr0c0-d/eating_books_croco_f

<!-- 백엔드 레포지토리 정보 배지 -->

[back-repository-size-shield]: https://img.shields.io/github/repo-size/cr0c0-d/cr0c0_eating_book?labelColor=D8D8D8&color=BE81F7
[back-repository-commit-activity]: https://img.shields.io/github/commit-activity/t/cr0c0-d/cr0c0_eating_book

<!-- 데모 사이트 -->

[readme-eng-shield]: https://img.shields.io/badge/-readme%20in%20english-2E2E2E?style=for-the-badge
[view-demo-shield]: https://img.shields.io/badge/-%F0%9F%98%8E%20view%20demo-F3F781?style=for-the-badge
[view-demo-url]: https://cr0c0-d.github.io
[report-bug-shield]: https://img.shields.io/badge/-%F0%9F%90%9E%20report%20bug-F5A9A9?style=for-the-badge
[report-bug-url]: https://github.com/cr0c0-d/eating_books_croco_f/issues
[view-demo-eatingbookscroco]: https://img.shields.io/badge/%F0%9F%92%BB%20%EB%8D%B0%EB%AA%A8%20%EC%82%AC%EC%9D%B4%ED%8A%B8%20%EB%B3%B4%EB%9F%AC%EA%B0%80%EA%B8%B0-skyblue?style=for-the-badge
[demo-url-eatingbookscroco]: https://eatingbooks.dandycr0c0.site/search

<!--Url for Buttons-->

[request-front-github-page]: https://img.shields.io/badge/%F0%9F%93%83%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20GitHub%20%ED%8E%98%EC%9D%B4%EC%A7%80-A9D0F5?style=for-the-badge
[request-back-github-page]: https://img.shields.io/badge/%F0%9F%93%83%20%EB%B0%B1%EC%97%94%EB%93%9C%20GitHub%20%ED%8E%98%EC%9D%B4%EC%A7%80-D6C7ED?style=for-the-badge
[front-github-page-url]: https://github.com/cr0c0-d/eating_books_croco_f
[back-github-page-url]: https://github.com/cr0c0-d/cr0c0_eating_book

<!-- 기술 스택 배지 -->
<!-- 백엔드 -->

[java]: https://img.shields.io/badge/Java-17-blue
[spring-boot]: https://img.shields.io/badge/Spring%20Boot-3.0.2-blue
[spring-security]: https://img.shields.io/badge/Spring%20Security-6.0.1-blue
[jjwt]: https://img.shields.io/badge/JJWT-0.9.1-blue
[spring-data-jpa]: https://img.shields.io/badge/Spring%20Data%20JPA-3.0.2-blue
[queryDSL]: https://img.shields.io/badge/QueryDSL-5.0.0-blue

<!-- 프론트엔드 -->

[react]: https://img.shields.io/badge/React-18.2.0-blue
[react-bootstrap]: https://img.shields.io/badge/React%20Bootstrap-2.10.1-blue
[axios]: https://img.shields.io/badge/Axios-1.6.7-blue

<!-- 기타 -->

[mySql]: https://img.shields.io/badge/MySQL-8.0-blue
[heroku]: https://img.shields.io/badge/Heroku-4F4F4F?logo=Heroku
[aws]: https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-4F4F4F?logo=amazonaws

<!--URLS-->

[license-url]: LICENSE.md
[contribution-url]: CONTRIBUTION.md
[readme-eng-url]: ../README.md
