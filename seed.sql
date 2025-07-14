INSERT INTO `users` (username, display_name, cohort_number, profile, grade1_class_number, grade2_class_number, grade3_class_number) VALUES
('kohotsunin', '甲乙人', 60, '5代目管理人', 5, 7, 9);

INSERT INTO `festivals` (festival_number, theme, theme_kana) VALUES
(60, '瞬', 'またたき');

INSERT INTO `andons` (festival_id, grade, class_number, title) VALUES
(1, 3, 9, '魄焔');

INSERT INTO `prizes` (name, description, hex_color, `order`) VALUES
('行灯大賞', '最も優れた行灯に贈られる賞', '#FF4500', 1);

INSERT INTO `andon_prizes` (andon_id, prize_id) VALUES
(1, 1);
