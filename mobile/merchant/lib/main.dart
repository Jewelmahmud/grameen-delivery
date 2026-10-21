import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:mobileapp_shared/mobileapp_shared.dart';
import 'screens/merchant_home_screen.dart';

void main() {
  runApp(const GrameenMerchantApp());
}

class GrameenMerchantApp extends StatefulWidget {
  const GrameenMerchantApp({super.key});

  @override
  State<GrameenMerchantApp> createState() => _GrameenMerchantAppState();
}

class _GrameenMerchantAppState extends State<GrameenMerchantApp> {
  Locale _locale = const Locale('bn');

  void setLocale(Locale locale) {
    setState(() {
      _locale = locale;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Grameen Delivery Merchant',
      theme: AppTheme.lightTheme,
      locale: _locale,
      supportedLocales: const [Locale('bn'), Locale('en')],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      home: MerchantHomeScreen(onLocaleChange: setLocale),
      debugShowCheckedModeBanner: false,
    );
  }
}
