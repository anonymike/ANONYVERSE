CREATE TABLE `mobile_releases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`version` varchar(32) NOT NULL,
	`platform` enum('android','ios') NOT NULL,
	`status` enum('draft','approved','withdrawn') NOT NULL DEFAULT 'draft',
	`downloadUrl` text,
	`releaseNotes` json NOT NULL,
	`minimumRequirement` varchar(180),
	`sha256` varchar(128),
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mobile_releases_id` PRIMARY KEY(`id`)
);
