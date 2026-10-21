import 'package:flutter/material.dart';
import 'package:mobileapp_shared/mobileapp_shared.dart';
import 'merchant_login_screen.dart';

class MerchantHomeScreen extends StatefulWidget {
  final void Function(Locale) onLocaleChange;
  const MerchantHomeScreen({super.key, required this.onLocaleChange});

  @override
  State<MerchantHomeScreen> createState() => _MerchantHomeScreenState();
}

class _MerchantHomeScreenState extends State<MerchantHomeScreen> {
  @override
  Widget build(BuildContext context) {
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          LanguageToggle(
            isBangla: isBangla,
            onToggle: (val) {
              widget.onLocaleChange(val ? const Locale('bn') : const Locale('en'));
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: Image.asset('assets/images/bg.jpg', fit: BoxFit.cover),
          ),
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    AppTheme.primaryColor.withOpacity(0.92),
                    AppTheme.primaryColor.withOpacity(0.82),
                    AppTheme.primaryDark.withOpacity(0.90),
                  ],
                ),
              ),
            ),
          ),
          SafeArea(
            child: Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(AppTheme.spacingLg),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      height: 110,
                      width: 230,
                      child: Image.asset('assets/images/logo.png', fit: BoxFit.contain),
                    ),
                    const SizedBox(height: 12),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.18),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.white.withOpacity(0.3)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.storefront, color: Colors.white, size: 16),
                          const SizedBox(width: 8),
                          Text(
                            isBangla ? 'মার্চেন্ট ও পার্টনার অ্যাপ' : 'Merchant & Business Partner App',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      isBangla
                          ? 'ব্যবসা বাড়ান দ্রুত ও বিশ্বস্ত গ্রামীণ ডেলিভারি সেবায়'
                          : 'Scale your business with reliable delivery services',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.white.withOpacity(0.9),
                      ),
                    ),
                    const SizedBox(height: AppTheme.spacingXl * 1.5),

                    CustomButton(
                      text: isBangla ? 'মার্চেন্ট পোর্টাল লগইন' : 'Merchant Portal Login',
                      icon: Icons.login,
                      backgroundColor: Colors.white,
                      textColor: AppTheme.primaryDark,
                      width: 290,
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const MerchantLoginScreen(),
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: AppTheme.spacingMd),

                    CustomButton(
                      text: isBangla ? 'নতুন মার্চেন্ট রেজিস্ট্রেশন' : 'Register New Merchant',
                      icon: Icons.business,
                      isOutlined: true,
                      textColor: Colors.white,
                      backgroundColor: Colors.white,
                      width: 290,
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const MerchantLoginScreen(),
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: AppTheme.spacingXl),

                    Text(
                      '© 2026 Grameen Delivery Merchant Platform',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.white.withOpacity(0.8),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
