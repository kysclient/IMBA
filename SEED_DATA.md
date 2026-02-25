# Seed Data (샘플 데이터)

아래 SQL을 Neon 콘솔에서 순서대로 실행하세요.

> **주의**: `posts` 테이블의 `user_id`는 실제 존재하는 사용자 ID를 사용해야 합니다. 아래 SQL은 먼저 시드용 사용자 2명을 생성한 뒤 해당 ID를 참조합니다.

---

## 1. 시드용 사용자 (게시글 작성자)

```sql
-- 비밀번호: SeedUser1! (bcrypt 해시)
INSERT INTO users (name, email, phone, password_hash, is_admin) VALUES
  ('김미영', 'miyoung@example.com', '01012345678', '$2b$10$dummyhashseeduser1placeholder000000000000000000000', FALSE),
  ('박소연', 'soyeon@example.com', '01087654321', '$2b$10$dummyhashseeduser2placeholder000000000000000000000', FALSE)
ON CONFLICT (email) DO NOTHING;
```

---

## 2. 교육과정 (courses)

```sql
INSERT INTO courses (category, title, level, duration, price, image_url, features, is_active, display_order) VALUES
(
  '스킨케어',
  '메디컬 스킨케어 마스터 클래스',
  '전문가 과정',
  '12주 (주 2회, 총 72시간)',
  '1,500,000원',
  'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2670&auto=format&fit=crop',
  ARRAY['초음파 기기 활용법','문제성 피부 분석','메디컬 필링 테크닉','고객 상담 심리학'],
  TRUE, 1
),
(
  '스킨케어',
  '에스테틱 기초 실무',
  '입문 과정',
  '8주 (주 2회, 총 48시간)',
  '850,000원',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2670&auto=format&fit=crop',
  ARRAY['피부 생리학 이해','클렌징 & 딥클렌징','기초 매뉴얼 테크닉','위생 및 소독 관리'],
  TRUE, 2
),
(
  '메디컬 왁싱',
  '슈가링 왁싱 마스터',
  '통합 과정',
  '6주 (주 2회, 총 36시간)',
  '1,200,000원',
  'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2669&auto=format&fit=crop',
  ARRAY['슈가링 페이스트 제조','전신 왁싱 실무','임산부 왁싱 특강','사후 인그로운 케어'],
  TRUE, 3
),
(
  '메디컬 왁싱',
  '페이스 왁싱 디자인',
  '단과 과정',
  '3주 (주 1회, 총 12시간)',
  '450,000원',
  'https://images.unsplash.com/photo-1512496015851-a1c8db5dd1f5?q=80&w=2574&auto=format&fit=crop',
  ARRAY['황금비율 눈썹 디자인','헤어라인 교정술','페이스 솜털 제모','피부 장벽 보호'],
  TRUE, 4
),
(
  '네일 아트',
  '프로페셔널 네일 아티스트',
  '전문가 과정',
  '10주 (주 2회, 총 60시간)',
  '1,100,000원',
  'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop',
  ARRAY['드릴 케어 마스터','아크릴 및 젤 연장','트렌드 아트 워크','살롱 실무 디자인'],
  TRUE, 5
),
(
  '스파 & 테라피',
  '홀리스틱 바디 테라피',
  '전문가 과정',
  '8주 (주 2회, 총 48시간)',
  '1,350,000원',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2670&auto=format&fit=crop',
  ARRAY['근막 이완 테크닉','아로마콜로지','스톤 테라피 실무','체형 불균형 분석'],
  TRUE, 6
);
```

---

## 3. 갤러리 (gallery)

```sql
INSERT INTO gallery (title, category, image_url, link_url, link_label, display_order) VALUES
-- 교육활동
(
  '2025 스킨케어 실습 현장',
  '교육활동',
  'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2670&auto=format&fit=crop',
  NULL, NULL, 1
),
(
  '메디컬 필링 테크닉 워크숍',
  '교육활동',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
  NULL, NULL, 2
),
(
  '네일 아트 트렌드 실습',
  '교육활동',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=2574&auto=format&fit=crop',
  NULL, NULL, 3
),
(
  '바디 테라피 수업 현장',
  '교육활동',
  'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2670&auto=format&fit=crop',
  NULL, NULL, 4
),
(
  '왁싱 기초 과정 실습 모습',
  '교육활동',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop',
  NULL, NULL, 5
),

-- 협회행사
(
  'IMBA 2025 상반기 수료식',
  '협회행사',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop',
  NULL, NULL, 6
),
(
  '국제 뷰티 컨퍼런스 참가',
  '협회행사',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2600&auto=format&fit=crop',
  NULL, NULL, 7
),
(
  '제5회 IMBA 정기 세미나',
  '협회행사',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2670&auto=format&fit=crop',
  NULL, NULL, 8
),
(
  '신년 네트워킹 행사',
  '협회행사',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2669&auto=format&fit=crop',
  NULL, NULL, 9
),

-- 미용대회
(
  '2025 아시아 뷰티 챔피언십 금상 수상',
  '미용대회',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop',
  NULL, NULL, 10
),
(
  '전국 에스테틱 기능대회 출전',
  '미용대회',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2670&auto=format&fit=crop',
  NULL, NULL, 11
),
(
  '제12회 K-Beauty 그랑프리 시상식',
  '미용대회',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2670&auto=format&fit=crop',
  NULL, NULL, 12
);
```

---

## 4. 게시글 (posts)

> 아래 SQL의 `user_id`는 위 시드 사용자 기준입니다. 실제 환경에서는 존재하는 user id로 교체하세요.

```sql
DO $$
DECLARE
  uid1 INTEGER;
  uid2 INTEGER;
BEGIN
  SELECT id INTO uid1 FROM users WHERE email = 'miyoung@example.com';
  SELECT id INTO uid2 FROM users WHERE email = 'soyeon@example.com';

  -- user가 없으면 NULL-safe하게 1로 대체
  IF uid1 IS NULL THEN uid1 := 1; END IF;
  IF uid2 IS NULL THEN uid2 := 1; END IF;

  INSERT INTO posts (user_id, category, title, content, author_name, views, is_pinned, created_at, updated_at) VALUES

  -- 공지사항
  (uid1, '공지사항', '2025년 하반기 수강 신청 안내',
  '안녕하세요, 국제메디컬뷰티협회(IMBA)입니다.

2025년 하반기 정규 교육과정 수강 신청이 시작되었습니다.

■ 신청 기간: 2025년 6월 1일 ~ 6월 30일
■ 개강일: 2025년 7월 7일 (월)
■ 모집 과정: 스킨케어, 메디컬 왁싱, 네일 아트, 스파 & 테라피

조기 마감될 수 있으니 서둘러 신청해주세요.
문의사항은 홈페이지 수강신청 페이지 또는 카카오톡 채널로 연락 부탁드립니다.

감사합니다.',
  '김미영', 342, TRUE, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),

  (uid1, '공지사항', 'IMBA 홈페이지가 새롭게 리뉴얼되었습니다',
  '안녕하세요, IMBA 가족 여러분!

더 나은 서비스를 제공해드리기 위해 홈페이지를 전면 리뉴얼하였습니다.

주요 변경 사항:
1. 교육과정 상세 정보 확인 가능
2. 온라인 수강신청 시스템 도입
3. 커뮤니티 게시판 오픈
4. 갤러리 페이지 추가

앞으로도 IMBA를 많이 이용해주세요.
불편한 점이 있으시면 언제든 문의 부탁드립니다.',
  '김미영', 518, TRUE, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),

  (uid1, '공지사항', '여름 특별 할인 이벤트 안내',
  '무더운 여름, IMBA에서 특별 할인 이벤트를 준비했습니다!

■ 이벤트 기간: 7월 한 달간
■ 혜택: 전 과정 수강료 10% 할인 + 교재 무료 제공
■ 대상: 신규 수강생

※ 기존 수강생 추천 시 추천인에게도 5만원 할인 쿠폰을 드립니다.
※ 본 이벤트는 조기 종료될 수 있습니다.

많은 관심과 참여 부탁드립니다!',
  '김미영', 287, FALSE, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),

  -- Q&A
  (uid2, 'Q&A', '비전공자도 스킨케어 과정 수강할 수 있나요?',
  '안녕하세요, 뷰티 분야에 관심이 많은 직장인입니다.

현재 IT 업계에서 일하고 있는데, 이직을 고려하며 에스테틱 쪽으로 진로를 바꾸고 싶습니다.
전공이 전혀 다른 비전공자인데 기초 과정부터 시작하면 따라갈 수 있을까요?

그리고 혹시 주말반이나 야간반도 운영되는지 궁금합니다.
직장을 다니면서 병행할 수 있으면 좋겠는데...

경험 있으신 선배님들의 조언 부탁드립니다!',
  '박소연', 156, FALSE, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),

  (uid2, 'Q&A', '왁싱 과정 수료 후 취업 전망은 어떤가요?',
  '슈가링 왁싱 마스터 과정에 관심이 있는데요,
수료 후 취업이나 창업에 대해 궁금합니다.

1. 수료 후 바로 현장에서 일할 수 있는 수준이 되나요?
2. IMBA 수료증이 취업 시 어느 정도 인정받는지 궁금합니다.
3. 소규모 창업을 할 경우 초기 비용이 대략 얼마나 드나요?

왁싱 전문점 창업을 목표로 하고 있어서 현실적인 조언 부탁드립니다.',
  '박소연', 203, FALSE, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days'),

  (uid1, 'Q&A', '네일 아트 과정에서 재료비가 별도로 드나요?',
  '프로페셔널 네일 아티스트 과정 수강을 고려 중입니다.

수강료 외에 재료비나 도구비가 별도로 발생하는지 궁금합니다.
그리고 수업에서 사용하는 재료나 도구를 개인적으로 구매해야 하는지,
아니면 수강료에 포함되어 있는지 알려주시면 감사하겠습니다.

또한 수업 시간 외에 개인 연습을 할 수 있는 공간이 제공되나요?',
  '김미영', 98, FALSE, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),

  -- 수강후기
  (uid2, '수강후기', '에스테틱 기초 실무 8주 과정을 마치며',
  '드디어 8주간의 에스테틱 기초 실무 과정을 수료했습니다!

처음에는 피부 생리학 같은 이론이 어렵게 느껴졌는데,
강사님께서 실무 사례와 함께 쉽게 설명해주셔서 금방 이해할 수 있었어요.

특히 좋았던 점:
- 소수 정원이라 1:1 피드백을 충분히 받을 수 있었어요
- 실제 고객 상담 롤플레이가 정말 도움이 됐습니다
- 최신 기기 실습 기회가 많았어요
- 함께 수강하는 동기분들과 좋은 네트워크도 형성

아쉬웠던 점:
- 8주가 너무 빨리 지나가서 아쉬워요 ㅠㅠ

전문가 과정도 이어서 수강할 예정입니다!
고민하시는 분들, 망설이지 마세요. 강력 추천합니다!',
  '박소연', 445, FALSE, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),

  (uid1, '수강후기', '슈가링 왁싱 마스터 과정 솔직 후기',
  '6주간의 슈가링 왁싱 마스터 과정 솔직 후기 남깁니다.

결론부터 말하면, 정말 잘 선택했다고 생각합니다.

저는 기존에 브라질리언 왁싱 경력 2년차인데,
슈가링은 처음이라 걱정이 많았거든요.

하지만 기초부터 차근차근 알려주시고,
특히 슈가링 페이스트 직접 만드는 수업이 정말 인상 깊었어요.

실습 위주의 커리큘럼이라 수료 후 바로 현장에 적용할 수 있었고,
지금은 슈가링 메뉴를 추가해서 매출이 30% 정도 올랐습니다.

강사님의 열정과 전문성이 정말 느껴지는 과정이었습니다.
왁싱 전문가를 꿈꾸는 분들께 적극 추천드려요!',
  '김미영', 312, FALSE, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),

  (uid2, '수강후기', '홀리스틱 바디 테라피, 인생 과정을 만났습니다',
  '바디 테라피 과정 수강 후기 남깁니다.

저는 10년차 마사지사인데, 체계적인 이론 교육을 받고 싶어서 등록했어요.
솔직히 경력이 있으니까 새로 배울 게 있을까 했는데... 완전히 다른 세계였습니다.

근막 이완 테크닉은 기존에 알던 것과 차원이 달랐고,
아로마콜로지 수업에서는 향기가 신체에 미치는 영향을 과학적으로 배울 수 있었어요.

스톤 테라피 실무 시간에는 실제 고객 시술 시뮬레이션까지 해볼 수 있어서
현장 적용에 자신감이 크게 올랐습니다.

무엇보다 체형 불균형 분석 파트가 가장 유용했어요.
고객에게 전문적인 상담을 해줄 수 있게 되니 신뢰도가 확 올라갔습니다.

IMBA 최고!',
  '박소연', 267, FALSE, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),

  (uid1, '수강후기', '네일 아트 과정, 초보도 할 수 있어요!',
  '완전 초보 상태에서 프로페셔널 네일 아티스트 과정을 수강했습니다.

저는 손재주가 없는 편이라 걱정이 많았는데,
강사님께서 정말 인내심 있게 가르쳐주셔서 10주 만에 놀라운 성장을 했어요.

첫 주: 젤 네일 기초 - 손이 떨려서 라인도 못 잡았어요 ㅋㅋ
5주차: 단색 컬러링과 기본 아트가 가능해졌어요
10주차: 웨딩 네일, 캐릭터 아트까지 할 수 있게 됐습니다!

수료 후 지금은 집에서 소규모로 홈 네일숍을 운영하고 있어요.
인스타그램으로 홍보하니 예약이 꽤 잡히고 있습니다.

초보라고 망설이시는 분들, 용기 내세요!
IMBA에서 전문가로 거듭날 수 있습니다.',
  '김미영', 189, FALSE, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days');

END $$;
```

---

## 5. 댓글 (comments)

```sql
DO $$
DECLARE
  uid1 INTEGER;
  uid2 INTEGER;
  post_qa1 INTEGER;
  post_qa2 INTEGER;
  post_review1 INTEGER;
BEGIN
  SELECT id INTO uid1 FROM users WHERE email = 'miyoung@example.com';
  SELECT id INTO uid2 FROM users WHERE email = 'soyeon@example.com';

  IF uid1 IS NULL THEN uid1 := 1; END IF;
  IF uid2 IS NULL THEN uid2 := 1; END IF;

  -- Q&A 첫 번째 글 (비전공자 질문)
  SELECT id INTO post_qa1 FROM posts WHERE title = '비전공자도 스킨케어 과정 수강할 수 있나요?' LIMIT 1;
  -- Q&A 두 번째 글 (왁싱 취업 전망)
  SELECT id INTO post_qa2 FROM posts WHERE title = '왁싱 과정 수료 후 취업 전망은 어떤가요?' LIMIT 1;
  -- 수강후기 첫 번째 글
  SELECT id INTO post_review1 FROM posts WHERE title = '에스테틱 기초 실무 8주 과정을 마치며' LIMIT 1;

  IF post_qa1 IS NOT NULL THEN
    INSERT INTO comments (post_id, user_id, author_name, content, created_at) VALUES
    (post_qa1, uid1, '김미영', '저도 비전공자 출신이에요! 기초 과정은 정말 처음부터 알려주셔서 전혀 문제없었어요. 오히려 다른 분야 경험이 고객 상담할 때 강점이 되더라고요. 화이팅하세요!', NOW() - INTERVAL '2 days'),
    (post_qa1, uid2, '박소연', '주말반은 아직 없는 걸로 알고 있어요. 하지만 평일 저녁반(6시~9시)은 운영되고 있어서 직장인분들이 많이 수강하세요. 사무실에 문의해보시면 자세한 시간표 안내받으실 수 있어요!', NOW() - INTERVAL '1 day');
  END IF;

  IF post_qa2 IS NOT NULL THEN
    INSERT INTO comments (post_id, user_id, author_name, content, created_at) VALUES
    (post_qa2, uid1, '김미영', '저는 수료 후 3개월 만에 1인 왁싱숍을 오픈했어요. 초기 비용은 보증금 포함해서 약 2,000만원 정도 들었습니다. IMBA 수료증은 확실히 도움이 됐고, 무엇보다 실습 경험이 풍부해서 바로 현장 투입이 가능했어요.', NOW() - INTERVAL '3 days'),
    (post_qa2, uid2, '박소연', '취업도 괜찮은 편이에요. 수료하면 IMBA에서 취업 연계도 해주시고, 저는 강남에 있는 피부관리실에 취업해서 지금 잘 다니고 있습니다. 왁싱 전문가 수요는 꾸준히 높아지고 있어요!', NOW() - INTERVAL '2 days');
  END IF;

  IF post_review1 IS NOT NULL THEN
    INSERT INTO comments (post_id, user_id, author_name, content, created_at) VALUES
    (post_review1, uid1, '김미영', '후기 잘 봤어요! 저도 전문가 과정 고민 중인데 결정했습니다 ㅎㅎ 같이 수강하게 될 수도 있겠네요!', NOW() - INTERVAL '12 hours'),
    (post_review1, uid2, '박소연', '감사합니다~ 전문가 과정도 정말 추천해요! 기초 과정보다 더 깊이 있는 내용을 배울 수 있어서 확실히 실력이 한 단계 업그레이드됩니다.', NOW() - INTERVAL '6 hours');
  END IF;

END $$;
```

---

## 6. 댓글 수 동기화

게시글의 `comment_count`는 별도 컬럼이 아니라 JOIN으로 계산되므로 별도 작업이 필요 없습니다.

## 7. 좋아요 (post_likes)

```sql
DO $$
DECLARE
  uid1 INTEGER;
  uid2 INTEGER;
BEGIN
  SELECT id INTO uid1 FROM users WHERE email = 'miyoung@example.com';
  SELECT id INTO uid2 FROM users WHERE email = 'soyeon@example.com';

  IF uid1 IS NULL THEN uid1 := 1; END IF;
  IF uid2 IS NULL THEN uid2 := 1; END IF;

  -- 수강후기 글에 좋아요
  INSERT INTO post_likes (post_id, user_id)
  SELECT p.id, uid1 FROM posts p WHERE p.category = '수강후기'
  ON CONFLICT (post_id, user_id) DO NOTHING;

  INSERT INTO post_likes (post_id, user_id)
  SELECT p.id, uid2 FROM posts p WHERE p.category = '수강후기'
  ON CONFLICT (post_id, user_id) DO NOTHING;

  -- 공지사항 첫 번째 글에 좋아요
  INSERT INTO post_likes (post_id, user_id)
  SELECT p.id, uid2 FROM posts p WHERE p.title = '2025년 하반기 수강 신청 안내'
  ON CONFLICT (post_id, user_id) DO NOTHING;
END $$;
```
