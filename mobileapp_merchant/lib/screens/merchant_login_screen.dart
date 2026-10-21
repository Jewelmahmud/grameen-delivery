import 'package:flutter/material.dart';
import 'package:mobileapp_shared/mobileapp_shared.dart';
import 'merchant_dashboard.dart';

class MerchantLoginScreen extends StatefulWidget {
  const MerchantLoginScreen({super.key});

  @override
  State<MerchantLoginScreen> createState() => _MerchantLoginScreenState();
}

class _MerchantLoginScreenState extends State<MerchantLoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _phoneOrEmailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _storeNameController = TextEditingController();
  final _addressController = TextEditingController();

  bool _isSignUp = false;
  bool _isLoading = false;
  bool _obscurePassword = true;

  @override
  void dispose() {
    _phoneOrEmailController.dispose();
    _passwordController.dispose();
    _storeNameController.dispose();
    _addressController.dispose();
    super.dispose();
  }

  void _handleAuth() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      Future.delayed(const Duration(milliseconds: 900), () {
        if (!mounted) return;
        setState(() {
          _isLoading = false;
        });

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const MerchantDashboard()),
        );
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_isSignUp ? 'মার্চেন্ট রেজিস্ট্রেশন' : 'মার্চেন্ট লগইন'),
        backgroundColor: AppTheme.primaryColor,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(AppTheme.spacingLg),
            child: Card(
              child: Padding(
                padding: const EdgeInsets.all(AppTheme.spacingLg),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const CircleAvatar(
                        radius: 36,
                        backgroundColor: AppTheme.bgAccent,
                        child: Icon(Icons.storefront, size: 40, color: AppTheme.primaryColor),
                      ),
                      const SizedBox(height: AppTheme.spacingMd),
                      Text(
                        _isSignUp ? 'নতুন মার্চেন্ট হিসেবে যোগ দিন' : 'স্বাগতম মার্চেন্ট পার্টনার',
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.textPrimary,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        _isSignUp
                            ? 'আপনার দোকানের তথ্য দিয়ে অ্যাকাউন্ট তৈরি করুন'
                            : 'গ্রামীণ ডেলিভারি মার্চেন্ট পোর্টালে প্রবেশ করুন',
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 13,
                          color: AppTheme.textSecondary,
                        ),
                      ),
                      const SizedBox(height: AppTheme.spacingLg),

                      if (_isSignUp) ...[
                        TextFormField(
                          controller: _storeNameController,
                          decoration: const InputDecoration(
                            labelText: 'ব্যবসা বা দোকানের নাম',
                            prefixIcon: Icon(Icons.business, color: AppTheme.primaryColor),
                          ),
                          validator: (v) => v == null || v.isEmpty ? 'দোকানের নাম লিখুন' : null,
                        ),
                        const SizedBox(height: AppTheme.spacingMd),
                        TextFormField(
                          controller: _addressController,
                          decoration: const InputDecoration(
                            labelText: 'পিকআপ হাব / দোকানের ঠিকানা',
                            prefixIcon: Icon(Icons.location_on, color: AppTheme.primaryColor),
                          ),
                          validator: (v) => v == null || v.isEmpty ? 'ঠিকানা লিখুন' : null,
                        ),
                        const SizedBox(height: AppTheme.spacingMd),
                      ],

                      TextFormField(
                        controller: _phoneOrEmailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: const InputDecoration(
                          labelText: 'মোবাইল নম্বর বা ইমেইল',
                          prefixIcon: Icon(Icons.person, color: AppTheme.primaryColor),
                        ),
                        validator: (v) => v == null || v.isEmpty ? 'নম্বর বা ইমেইল দিন' : null,
                      ),
                      const SizedBox(height: AppTheme.spacingMd),

                      TextFormField(
                        controller: _passwordController,
                        obscureText: _obscurePassword,
                        decoration: InputDecoration(
                          labelText: 'পাসওয়ার্ড',
                          prefixIcon: const Icon(Icons.lock, color: AppTheme.primaryColor),
                          suffixIcon: IconButton(
                            icon: Icon(
                              _obscurePassword ? Icons.visibility_off : Icons.visibility,
                              color: AppTheme.textSecondary,
                            ),
                            onPressed: () {
                              setState(() {
                                _obscurePassword = !_obscurePassword;
                              });
                            },
                          ),
                        ),
                        validator: (v) {
                          if (v == null || v.isEmpty) return 'পাসওয়ার্ড লিখুন';
                          if (v.length < 6) return 'কমপক্ষে ৬ ডিজিটের হতে হবে';
                          return null;
                        },
                      ),
                      const SizedBox(height: AppTheme.spacingLg),

                      CustomButton(
                        text: _isSignUp ? 'অ্যাকাউন্ট তৈরি করুন' : 'লগইন করুন',
                        isLoading: _isLoading,
                        onPressed: _handleAuth,
                      ),
                      const SizedBox(height: AppTheme.spacingMd),

                      TextButton(
                        onPressed: () {
                          setState(() {
                            _isSignUp = !_isSignUp;
                          });
                        },
                        child: Text(
                          _isSignUp
                              ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন'
                              : 'নতুন মার্চেন্ট? এখানে অ্যাকাউন্ট তৈরি করুন',
                          style: const TextStyle(
                            color: AppTheme.primaryColor,
                            fontWeight: FontWeight.bold,
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
      ),
    );
  }
}
