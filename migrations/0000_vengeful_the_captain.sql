CREATE TABLE `andons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`festival_id` integer NOT NULL,
	`grade` integer NOT NULL,
	`class_number` integer NOT NULL,
	`title` text,
	`description` text,
	`score` real,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `andon_festival_id_grade_class_number_key` ON `andons` (`festival_id`,`grade`,`class_number`);--> statement-breakpoint
CREATE INDEX `andon_festival_id_idx` ON `andons` (`festival_id`);--> statement-breakpoint
CREATE TABLE `articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`owner_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `andon_prizes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`andon_id` integer NOT NULL,
	`prize_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`andon_id`) REFERENCES `andons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`prize_id`) REFERENCES `prizes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `andon_prizes_andon_id_prize_id_key` ON `andon_prizes` (`andon_id`,`prize_id`);--> statement-breakpoint
CREATE INDEX `andon_prizes_andon_id_idx` ON `andon_prizes` (`andon_id`);--> statement-breakpoint
CREATE INDEX `andon_prizes_prize_id_idx` ON `andon_prizes` (`prize_id`);--> statement-breakpoint
CREATE TABLE `festivals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`festival_number` integer NOT NULL,
	`theme` text NOT NULL,
	`theme_kana` text,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `festivals_festivalNumber_unique` ON `festivals` (`festival_number`);--> statement-breakpoint
CREATE TABLE `prizes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`hex_color` text NOT NULL,
	`order` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`display_name` text NOT NULL,
	`cohort_number` integer NOT NULL,
	`profile` text,
	`grade1_class_number` integer,
	`grade2_class_number` integer,
	`grade3_class_number` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);