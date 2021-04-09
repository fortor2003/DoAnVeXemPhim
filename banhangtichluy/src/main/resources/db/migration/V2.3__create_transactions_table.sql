CREATE TABLE transactions (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(25) NOT NULL,
    `amount_id` BIGINT UNSIGNED NOT NULL,
    `before_value` INT UNSIGNED NOT NULL,
    `plus_value` INT NOT NULL,
    `after_value` INT UNSIGNED NOT NULL,
    `note` VARCHAR(150) DEFAULT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_by` BIGINT NOT NULL,
    `updated_by` BIGINT NOT NULL,
    UNIQUE INDEX `ui_code` (`code` ASC)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;