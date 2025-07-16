INSERT INTO `users` (id, email, username, display_name, cohort_number, profile, grade1_class_number, grade2_class_number, grade3_class_number) VALUES
('0', 'kohotsunin@gmail.com', 'kohotsunin', '甲乙人', 60, '5代目管理人', 5, 7, 9);

INSERT INTO `festivals` (id, number, theme, theme_kana) VALUES
('0', 60, '瞬', 'またたき');

INSERT INTO `andons` (id, festival_id, grade, class_number, title) VALUES
('0', '0', 3, 9, '魄焔');

INSERT INTO `prizes` (id, name, hex_color, `order`) VALUES
('0', '行灯大賞', '#ff3300', 1);

INSERT INTO `andon_prizes` (id, andon_id, prize_id) VALUES
('0', '0', '0');
