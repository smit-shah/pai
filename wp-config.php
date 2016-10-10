<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'pai');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '-E)A$o4GI1d kA!`?z>]K#*/Da DDOH,XcX`A<,:vteP];CC@U,.X?ixbGQ6tzot');
define('SECURE_AUTH_KEY',  '|=`(c(V?k.X=oCj]H/8I $D#?:xB1)j.0X,BI! exqOYC}|kw Vh.=tc*WV|Zr%R');
define('LOGGED_IN_KEY',    '{SCoteWRDR/tTXv29%Jz&heV:{cx@(bSf?].O}wo0l1CxFgri8K3m$7=Tv974F2n');
define('NONCE_KEY',        '.Dd?]T:z2&:)Swx/<*&YJDSR Ks8/^W|D Z d[)dZ4UKDumaQ)d_NB{Kyz0(h~gA');
define('AUTH_SALT',        '{;|;2Mj_= 1y-eg]ISicam}Ji]r[RgA|okXQ*b<{=[`J`t$zO-!+xRK<ibZmaXQ<');
define('SECURE_AUTH_SALT', 'm_5 ~?EiXJE]APDvI|U;*/F^L%@r0; Vnn-uCC7a{./;l)R)[a.r6_p#:ry7u@lu');
define('LOGGED_IN_SALT',   'WI(T_IeoNIZ{(aNW^w r[SU=qy6WOrB3i<ka{<8;EomS3&@0NgL3ean6c-?B5j%+');
define('NONCE_SALT',       '-|_D-0?c9HAJ)fE@C+|G1RB=+e6kJ.T}lGakefU@LStRJQV|4A]Q /g<&G9BZ$V&');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
