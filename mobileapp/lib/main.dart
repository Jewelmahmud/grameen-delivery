import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:mobileapp_shared/mobileapp_shared.dart';
import 'l10n/app_localizations.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const GrameenRiderApp());
}

class GrameenRiderApp extends StatefulWidget {
  const GrameenRiderApp({super.key});

  @override
  State<GrameenRiderApp> createState() => _GrameenRiderAppState();
}

class _GrameenRiderAppState extends State<GrameenRiderApp> {
  Locale _locale = const Locale('bn');

  void setLocale(Locale locale) {
    setState(() {
      _locale = locale;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Grameen Delivery Rider',
      theme: AppTheme.lightTheme,
      locale: _locale,
      supportedLocales: const [Locale('bn'), Locale('en')],
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      home: HomeScreen(onLocaleChange: setLocale),
      debugShowCheckedModeBanner: false,
    );
  }
}
