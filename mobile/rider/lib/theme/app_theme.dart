import 'package:flutter/material.dart';

class AppTheme {
  // Color constants based on the provided CSS variables
  static const Color primaryColor = Color(0xFF4CAF50);
  static const Color primaryLight = Color(0xFFA5D6A7);
  static const Color primaryDark = Color(0xFF388E3C);
  static const Color secondaryColor = Color(0xFFFF9800);
  static const Color secondaryLight = Color(0xFFFFCC80);
  static const Color secondaryDark = Color(0xFFF57C00);
  static const Color accentColor = Color(0xFF2196F3);
  static const Color textPrimary = Color(0xFF212121);
  static const Color textSecondary = Color(0xFF616161);
  static const Color textTertiary = Color(0xFF9E9E9E);
  static const Color textLight = Color(0xFFF5F5F5);
  static const Color bgPrimary = Color(0xFFFFFFFF);
  static const Color bgSecondary = Color(0xFFF9F9F9);
  static const Color bgTertiary = Color(0xFFF0F0F0);
  static const Color bgAccent = Color(0xFFE8F5E9);
  static const Color statusSuccess = Color(0xFF4CAF50);
  static const Color statusWarning = Color(0xFFFF9800);
  static const Color statusError = Color(0xFFF44336);
  static const Color statusInfo = Color(0xFF2196F3);
  static const Color statusNeutral = Color(0xFF9E9E9E);
  static const Color borderColor = Color(0xFFE0E0E0);

  // Spacing constants
  static const double spacingXs = 4.0;
  static const double spacingSm = 8.0;
  static const double spacingMd = 16.0;
  static const double spacingLg = 24.0;
  static const double spacingXl = 32.0;

  // Border radius
  static const double borderRadius = 4.0;

  // Shadows
  static const List<BoxShadow> shadowSm = [
    BoxShadow(color: Color(0x0D000000), offset: Offset(0, 2), blurRadius: 4),
  ];

  static const List<BoxShadow> shadowMd = [
    BoxShadow(color: Color(0x1A000000), offset: Offset(0, 4), blurRadius: 8),
  ];

  static const List<BoxShadow> shadowLg = [
    BoxShadow(color: Color(0x1A000000), offset: Offset(0, 8), blurRadius: 16),
  ];

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      fontFamily: 'Kalpurush',
      colorScheme: const ColorScheme.light(
        primary: primaryColor,
        primaryContainer: primaryLight,
        secondary: secondaryColor,
        secondaryContainer: secondaryLight,
        tertiary: accentColor,
        surface: bgPrimary,
        background: bgSecondary,
        error: statusError,
        onPrimary: textLight,
        onSecondary: textLight,
        onTertiary: textLight,
        onSurface: textPrimary,
        onBackground: textPrimary,
        onError: textLight,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryColor,
        foregroundColor: textLight,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          color: textLight,
          fontSize: 20,
          fontWeight: FontWeight.w600,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: textLight,
          elevation: 2,
          padding: const EdgeInsets.symmetric(
            horizontal: spacingLg,
            vertical: spacingMd,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(borderRadius),
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primaryColor,
          side: const BorderSide(color: primaryColor),
          padding: const EdgeInsets.symmetric(
            horizontal: spacingLg,
            vertical: spacingMd,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(borderRadius),
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: primaryColor,
          padding: const EdgeInsets.symmetric(
            horizontal: spacingMd,
            vertical: spacingSm,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: bgPrimary,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(borderRadius),
          borderSide: const BorderSide(color: borderColor),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(borderRadius),
          borderSide: const BorderSide(color: borderColor),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(borderRadius),
          borderSide: const BorderSide(color: primaryColor, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(borderRadius),
          borderSide: const BorderSide(color: statusError),
        ),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: spacingMd,
          vertical: spacingSm,
        ),
      ),
      cardTheme: CardThemeData(
        color: bgPrimary,
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadius),
        ),
        margin: const EdgeInsets.all(spacingSm),
      ),
      floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: primaryColor,
        foregroundColor: textLight,
        elevation: 4,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: bgPrimary,
        selectedItemColor: primaryColor,
        unselectedItemColor: textTertiary,
        type: BottomNavigationBarType.fixed,
        elevation: 8,
      ),
    );
  }
}
