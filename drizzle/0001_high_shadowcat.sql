CREATE TABLE `admin_audit_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`actorUserId` int NOT NULL,
	`action` varchar(120) NOT NULL,
	`providerId` int,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `admin_audit_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `content_items` (
	`id` varchar(80) NOT NULL,
	`kind` varchar(32) NOT NULL,
	`providerId` int,
	`title` varchar(240) NOT NULL,
	`subtitle` text,
	`description` text,
	`artworkUrl` text,
	`heroUrl` text,
	`year` varchar(32),
	`rating` decimal(3,1),
	`duration` varchar(40),
	`language` varchar(64),
	`genres` json,
	`details` json,
	`sourceType` enum('demo','provider') NOT NULL DEFAULT 'demo',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contentId` varchar(80) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `provider_health_checks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`providerId` int NOT NULL,
	`ok` boolean NOT NULL,
	`message` text,
	`checkedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `provider_health_checks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `providers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`providerKey` varchar(80) NOT NULL,
	`name` varchar(180) NOT NULL,
	`category` varchar(64) NOT NULL,
	`docsUrl` text,
	`baseUrl` text,
	`authType` varchar(64),
	`environment` enum('development','test','production') NOT NULL DEFAULT 'development',
	`credentialRef` varchar(180),
	`subscriptionInfo` text,
	`setupStatus` enum('not_configured','configured','tested','active') NOT NULL DEFAULT 'not_configured',
	`approvalStatus` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`enabled` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `providers_id` PRIMARY KEY(`id`),
	CONSTRAINT `providers_providerKey_unique` UNIQUE(`providerKey`)
);
--> statement-breakpoint
CREATE TABLE `viewing_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contentId` varchar(80) NOT NULL,
	`progress` decimal(5,4) NOT NULL DEFAULT '0',
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `viewing_progress_id` PRIMARY KEY(`id`)
);
