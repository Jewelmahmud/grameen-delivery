import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/custom_button.dart';
import 'admin/admin_dashboard.dart';
import 'partner/partner_dashboard.dart';
import 'rider/driver_dashboard.dart';
import '../l10n/app_localizations.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  bool _isSignUp = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _handleAuth() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      // Simulate API call
      Future.delayed(const Duration(seconds: 2), () {
        setState(() {
          _isLoading = false;
        });

        // TODO: After API integration, redirect to dashboard based on user role
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const DriverDashboard()),
        );
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      body: Stack(
        children: [
          SafeArea(
            child: Column(
              children: [
                // Main content area
                Expanded(
                  child: Center(
                    child: SingleChildScrollView(
                      padding: const EdgeInsets.all(AppTheme.spacingLg),
                      child: Container(
                        padding: const EdgeInsets.all(AppTheme.spacingXl),
                        child: Form(
                          key: _formKey,
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Icon(
                                _isSignUp ? Icons.person_add : Icons.login,
                                size: 64,
                                color: AppTheme.primaryColor,
                              ),
                              const SizedBox(height: AppTheme.spacingMd),
                              Text(
                                _isSignUp ? loc.signupTitle : loc.loginTitle,
                                style: const TextStyle(
                                  fontSize: 28,
                                  fontWeight: FontWeight.bold,
                                  color: AppTheme.textPrimary,
                                ),
                              ),
                              const SizedBox(height: AppTheme.spacingSm),
                              Text(
                                _isSignUp ? loc.createAccount : loc.welcomeBack,
                                textAlign: TextAlign.center,
                                style: const TextStyle(
                                  fontSize: 16,
                                  color: AppTheme.textSecondary,
                                ),
                              ),
                              const SizedBox(height: AppTheme.spacingXl),
                              // Email Input
                              Align(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  loc.email,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    color: AppTheme.textPrimary,
                                  ),
                                ),
                              ),
                              const SizedBox(height: AppTheme.spacingSm),
                              TextFormField(
                                controller: _emailController,
                                keyboardType: TextInputType.emailAddress,
                                style: const TextStyle(
                                  color: AppTheme.textPrimary,
                                ),
                                decoration: InputDecoration(
                                  hintText: loc.email,
                                  hintStyle: const TextStyle(
                                    color: AppTheme.textTertiary,
                                  ),
                                  prefixIcon: const Icon(
                                    Icons.email,
                                    color: AppTheme.textSecondary,
                                  ),
                                  filled: true,
                                  fillColor: AppTheme.bgSecondary,
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(5),
                                    borderSide: const BorderSide(
                                      color: AppTheme.borderColor,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(5),
                                    borderSide: const BorderSide(
                                      color: AppTheme.primaryColor,
                                    ),
                                  ),
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return loc.email;
                                  }
                                  if (!RegExp(
                                    r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}\u000024',
                                  ).hasMatch(value)) {
                                    return loc.email;
                                  }
                                  return null;
                                },
                              ),
                              const SizedBox(height: AppTheme.spacingLg),
                              // Password Input
                              Align(
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  loc.password,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    color: AppTheme.textPrimary,
                                  ),
                                ),
                              ),
                              const SizedBox(height: AppTheme.spacingSm),
                              TextFormField(
                                controller: _passwordController,
                                obscureText: true,
                                style: const TextStyle(
                                  color: AppTheme.textPrimary,
                                ),
                                decoration: InputDecoration(
                                  hintText: loc.password,
                                  hintStyle: const TextStyle(
                                    color: AppTheme.textTertiary,
                                  ),
                                  prefixIcon: const Icon(
                                    Icons.lock,
                                    color: AppTheme.textSecondary,
                                  ),
                                  filled: true,
                                  fillColor: AppTheme.bgSecondary,
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(5),
                                    borderSide: const BorderSide(
                                      color: AppTheme.borderColor,
                                    ),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(5),
                                    borderSide: const BorderSide(
                                      color: AppTheme.primaryColor,
                                    ),
                                  ),
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return loc.password;
                                  }
                                  if (value.length < 6) {
                                    return loc.passwordMinLength;
                                  }
                                  return null;
                                },
                              ),
                              const SizedBox(height: AppTheme.spacingXl),
                              // Auth Button
                              CustomButton(
                                text: _isSignUp
                                    ? loc.signupTitle
                                    : loc.loginTitle,
                                icon: _isSignUp
                                    ? Icons.person_add
                                    : Icons.login,
                                isLoading: _isLoading,
                                backgroundColor: AppTheme.primaryColor,
                                textColor: Colors.white,
                                onPressed: _handleAuth,
                              ),
                              const SizedBox(height: AppTheme.spacingLg),
                              // Toggle Sign Up/Login
                              TextButton(
                                onPressed: () {
                                  setState(() {
                                    _isSignUp = !_isSignUp;
                                  });
                                },
                                child: Text(
                                  _isSignUp
                                      ? loc.alreadyHaveAccount
                                      : loc.dontHaveAccount,
                                  style: const TextStyle(
                                    color: AppTheme.primaryColor,
                                  ),
                                ),
                              ),
                              // Forgot Password
                              if (!_isSignUp)
                                TextButton(
                                  onPressed: () {
                                    // TODO: Implement forgot password
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text(
                                          loc.forgotPasswordComingSoon,
                                        ),
                                      ),
                                    );
                                  },
                                  child: Text(
                                    loc.forgotPassword,
                                    style: const TextStyle(
                                      color: AppTheme.textSecondary,
                                    ),
                                  ),
                                ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                // Footer with dashboard links
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppTheme.spacingLg,
                    vertical: AppTheme.spacingMd,
                  ),
                  decoration: BoxDecoration(
                    color: AppTheme.bgSecondary,
                    border: Border(
                      top: BorderSide(color: AppTheme.borderColor, width: 1),
                    ),
                  ),
                  child: Column(
                    children: [
                      Text(
                        'Dashboard Access',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppTheme.textSecondary,
                        ),
                      ),
                      const SizedBox(height: AppTheme.spacingSm),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          _buildDashboardLink(
                            context,
                            loc.dashboardAdmin,
                            Icons.admin_panel_settings,
                            const AdminDashboard(),
                          ),
                          _buildDashboardLink(
                            context,
                            loc.dashboardPartner,
                            Icons.business,
                            const PartnerDashboard(),
                          ),
                          _buildDashboardLink(
                            context,
                            loc.dashboardRider,
                            Icons.delivery_dining,
                            const DriverDashboard(),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDashboardLink(
    BuildContext context,
    String title,
    IconData icon,
    Widget dashboard,
  ) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => dashboard),
        );
      },
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppTheme.spacingMd,
          vertical: AppTheme.spacingSm,
        ),
        decoration: BoxDecoration(
          color: AppTheme.primaryColor.withOpacity(0.1),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: AppTheme.primaryColor.withOpacity(0.3),
            width: 1,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 20, color: AppTheme.primaryColor),
            const SizedBox(height: 4),
            Text(
              title,
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w500,
                color: AppTheme.primaryColor,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
