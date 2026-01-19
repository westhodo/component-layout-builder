# Visual Layout Builder

### A Component-Based UI Composition Tool

실무 환경에서의 공통 컴포넌트 재사용 경험을
시각적인 UI 조립 도구로 정리한 개인 프로젝트입니다.

---

## Why

프로젝트를 진행하며 반복적으로 수행하던
“공통 컴포넌트를 재가공하여 화면을 구성하는 과정”을
구조적으로 설명할 수 있는 형태로 정리하고자 시작했습니다.

초기에는 와이어프레임 빌더 아이디어에서 출발했지만,
실제 업무 흐름과의 연관성을 고려해
컴포넌트 중심의 UI 구성 도구로 방향을 전환했습니다.

---

## Features

- Drag & Resize 기반 컴포넌트 배치
- 컴포넌트 props 실시간 편집
- PrimeVue / Custom Component 공통 처리
- 레이아웃 저장 / 불러오기
- 컴포넌트 추가 및 삭제 (ESC 키로 컴포넌트 삭제)

---

## Design Notes

- 컴포넌트는 `componentKey` 기반으로 관리
- Vue Component 인스턴스는 저장하지 않고 key 기반으로 복원
- 저장 가능한 상태(JSON)와 런타임 상태를 분리하여 설계

---

## Scope

- **Undo / Redo**
  - Drag, Resize, Props 변경 이력을 Command 패턴 또는 History Stack으로 관리
  - 상태 스냅샷이 아닌 Action 단위 기록을 목표로 설계 예정

- **Component Grouping**
  - 다중 선택 후 그룹화
  - 그룹을 하나의 레이어로 관리하여 이동 / 리사이즈 동기화
  - 내부 컴포넌트는 상대 좌표 기반으로 유지

- **Layer Hierarchy**
  - Layer → Component 트리 구조
  - 부모 레이어 이동 시 자식 컴포넌트 동기화

- **Canvas Zoom & Pan**
  - 마우스 휠 기반 화면 확대 / 축소
  - Pan 상태에서도 Drag & Resize 정확도 유지
  - 실제 좌표와 화면 좌표를 분리한 좌표계 관리

이 기능들은 핵심 구조 안정화 이후 단계적으로 확장할 계획입니다.
