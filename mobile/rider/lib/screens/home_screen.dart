import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import '../theme/app_theme.dart';
import '../widgets/custom_button.dart';
import 'order_tracking_screen.dart';
import 'login_screen.dart';

class HomeScreen extends StatelessWidget {
  final void Function(Locale) onLocaleChange;
  const HomeScreen({super.key, required this.onLocaleChange});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            child: GestureDetector(
              onTap: () {
                onLocaleChange(
                  isBangla ? const Locale('en') : const Locale('bn'),
                );
              },
              child: Container(
                width: 80,
                height: 32,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: Colors.white.withOpacity(0.3),
                    width: 1,
                  ),
                ),
                child: Stack(
                  children: [
                    // Background indicator
                    AnimatedAlign(
                      alignment: isBangla
                          ? Alignment.centerLeft
                          : Alignment.centerRight,
                      duration: const Duration(milliseconds: 300),
                      child: Container(
                        width: 40,
                        height: 28,
                        margin: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(14),
                        ),
                      ),
                    ),
                    // Text labels
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        // Bangla text
                        Expanded(
                          child: Center(
                            child: Text(
                              'বাং',
                              style: TextStyle(
                                color: isBangla
                                    ? Colors.black
                                    : Colors.white.withOpacity(0.7),
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                        // English text
                        Expanded(
                          child: Center(
                            child: Text(
                              'EN',
                              style: TextStyle(
                                color: !isBangla
                                    ? Colors.black
                                    : Colors.white.withOpacity(0.7),
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
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
                    AppTheme.primaryColor.withOpacity(0.9),
                    AppTheme.primaryColor.withOpacity(0.7),
                    AppTheme.primaryColor.withOpacity(0.5),
                    Colors.green.shade600.withOpacity(0.3),
                    Colors.green.shade500.withOpacity(0.2),
                  ],
                  stops: const [0.0, 0.3, 0.6, 0.8, 1.0],
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
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    // App Logo/Title
                    SizedBox(
                      height: 130,
                      width: 250,
                      child: Image.asset(
                        'assets/images/logo.png',
                        fit: BoxFit.contain,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      loc.homeSlogan,
                      style: TextStyle(
                        fontSize: 16,
                        color: AppTheme.textLight.withOpacity(0.8),
                      ),
                    ),
                    const SizedBox(height: AppTheme.spacingXl * 2),
                    // Main Action Buttons
                    CustomButton(
                      text: loc.homeTrackOrder,
                      icon: Icons.location_on,
                      backgroundColor: Colors.white,
                      textColor: AppTheme.primaryColor,
                      width: 280,
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const OrderTrackingScreen(),
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: AppTheme.spacingMd),
                    CustomButton(
                      text: loc.homeLogin,
                      icon: Icons.person,
                      isOutlined: true,
                      textColor: Colors.white,
                      width: 280,
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const LoginScreen(),
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: AppTheme.spacingXl),
                    // Footer
                    Text(
                      loc.copyright(loc.appTitle),
                      style: const TextStyle(fontSize: 12, color: Colors.white),
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
