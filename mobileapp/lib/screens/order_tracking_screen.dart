import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/custom_button.dart';
import '../l10n/app_localizations.dart';

class OrderTrackingScreen extends StatefulWidget {
  const OrderTrackingScreen({super.key});

  @override
  State<OrderTrackingScreen> createState() => _OrderTrackingScreenState();
}

class _OrderTrackingScreenState extends State<OrderTrackingScreen> {
  final TextEditingController _orderNumberController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isTracking = false;

  @override
  void dispose() {
    _orderNumberController.dispose();
    super.dispose();
  }

  void _trackOrder() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isTracking = true;
      });

      // Simulate API call
      Future.delayed(const Duration(seconds: 2), () {
        setState(() {
          _isTracking = false;
        });

        // Check for dummy tracking number
        if (_orderNumberController.text.trim() == '1234') {
          _showDummyTrackingResult();
        } else {
          // Show generic tracking result for other numbers
          _showTrackingResult();
        }
      });
    }
  }

  void _showDummyTrackingResult() {
    final loc = AppLocalizations.of(context)!;
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
        title: Text(loc.orderTrackingStatus),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header with logo
              Center(
                child: Column(
                  children: [
                    Icon(
                      Icons.delivery_dining,
                      size: 48,
                      color: AppTheme.primaryColor,
                    ),
                    const SizedBox(height: AppTheme.spacingMd),
                    Text(
                      'ডেলিভারি #1234',
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppTheme.spacingLg),

              // Delivery Details
              _buildDetailRow(
                'পণ্যের নাম',
                'স্মার্টফোন স্যামসাং গ্যালাক্সি S24',
              ),
              _buildDetailRow('গ্রাহকের নাম', 'আহমেদ হাসান'),
              _buildDetailRow('ঠিকানা', 'হাউস #45, রোড #12, ধানমন্ডি, ঢাকা'),
              _buildDetailRow('ফোন নম্বর', '+880 1712-345678'),
              _buildDetailRow('অর্ডার তারিখ', '১৫ মার্চ, ২০২৪'),
              _buildDetailRow('ডেলিভারি তারিখ', '১৬ মার্চ, ২০২৪'),

              const SizedBox(height: AppTheme.spacingMd),

              // Status
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(
                  horizontal: AppTheme.spacingMd,
                  vertical: AppTheme.spacingSm,
                ),
                decoration: BoxDecoration(
                  color: AppTheme.statusSuccess.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(5),
                  border: Border.all(color: AppTheme.statusSuccess),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.check_circle,
                      color: AppTheme.statusSuccess,
                      size: 20,
                    ),
                    const SizedBox(width: AppTheme.spacingSm),
                    Text(
                      'ডেলিভারি সম্পন্ন',
                      style: const TextStyle(
                        color: AppTheme.statusSuccess,
                        fontWeight: FontWeight.w600,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: AppTheme.spacingMd),

              // Delivery Timeline
              Text(
                'ডেলিভারি টাইমলাইন',
                style: const TextStyle(
                  fontWeight: FontWeight.w600,
                  fontSize: 16,
                  color: AppTheme.textPrimary,
                ),
              ),
              const SizedBox(height: AppTheme.spacingSm),

              _buildTimelineItem(
                'অর্ডার গৃহীত',
                '১৫ মার্চ, ২০২৪ - ১০:৩০ AM',
                Icons.shopping_cart,
                AppTheme.statusInfo,
                true,
              ),
              _buildTimelineItem(
                'প্রক্রিয়াকরণ',
                '১৫ মার্চ, ২০২৪ - ২:১৫ PM',
                Icons.inventory,
                AppTheme.statusWarning,
                true,
              ),
              _buildTimelineItem(
                'পথে আছে',
                '১৬ মার্চ, ২০২৪ - ৯:৪৫ AM',
                Icons.local_shipping,
                AppTheme.statusInfo,
                true,
              ),
              _buildTimelineItem(
                'ডেলিভারি সম্পন্ন',
                '১৬ মার্চ, ২০২৪ - ১১:২০ AM',
                Icons.check_circle,
                AppTheme.statusSuccess,
                true,
              ),

              const SizedBox(height: AppTheme.spacingMd),

              // Driver Info
              Container(
                padding: const EdgeInsets.all(AppTheme.spacingMd),
                decoration: BoxDecoration(
                  color: AppTheme.bgAccent,
                  borderRadius: BorderRadius.circular(5),
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      backgroundColor: AppTheme.primaryColor,
                      child: const Icon(Icons.person, color: Colors.white),
                    ),
                    const SizedBox(width: AppTheme.spacingMd),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'রাইডার: করিম আহমেদ',
                            style: TextStyle(fontWeight: FontWeight.w600),
                          ),
                          Text(
                            'ফোন: +880 1812-345678',
                            style: TextStyle(
                              color: AppTheme.textSecondary,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(loc.close),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(
              '$label:',
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: AppTheme.textPrimary,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(color: AppTheme.textSecondary),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineItem(
    String title,
    String time,
    IconData icon,
    Color color,
    bool isCompleted,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Icon(
            icon,
            color: isCompleted ? color : AppTheme.textTertiary,
            size: 20,
          ),
          const SizedBox(width: AppTheme.spacingMd),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    color: isCompleted
                        ? AppTheme.textPrimary
                        : AppTheme.textTertiary,
                  ),
                ),
                Text(
                  time,
                  style: TextStyle(
                    fontSize: 12,
                    color: isCompleted
                        ? AppTheme.textSecondary
                        : AppTheme.textTertiary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _showTrackingResult() {
    final loc = AppLocalizations.of(context)!;
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
        title: Text(loc.orderTrackingStatus),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.delivery_dining, size: 48, color: AppTheme.primaryColor),
            const SizedBox(height: AppTheme.spacingMd),
            Text(
              '${loc.orderTrackingTitle} #${_orderNumberController.text}',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: AppTheme.spacingSm),
            Container(
              padding: const EdgeInsets.symmetric(
                horizontal: AppTheme.spacingMd,
                vertical: AppTheme.spacingSm,
              ),
              decoration: BoxDecoration(
                color: AppTheme.statusInfo.withOpacity(0.1),
                borderRadius: BorderRadius.circular(AppTheme.borderRadius),
                border: Border.all(color: AppTheme.statusInfo),
              ),
              child: Text(
                loc.orderTrackingOnTheWay,
                style: const TextStyle(
                  color: AppTheme.statusInfo,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            const SizedBox(height: AppTheme.spacingMd),
            Text(
              loc.orderTrackingDeliveredBy('John D.'),
              textAlign: TextAlign.center,
              style: const TextStyle(color: AppTheme.textSecondary),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(loc.close),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(
        title: Text(loc.orderTrackingTitle),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(AppTheme.spacingLg),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: AppTheme.spacingLg),
              // Header
              Center(
                child: Column(
                  children: [
                    Icon(
                      Icons.location_on,
                      size: 64,
                      color: AppTheme.primaryColor,
                    ),
                    const SizedBox(height: AppTheme.spacingMd),
                    Text(
                      loc.orderTrackingTitle,
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.textPrimary,
                      ),
                    ),
                    const SizedBox(height: AppTheme.spacingSm),
                    Text(
                      loc.orderTrackingHint,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 16,
                        color: AppTheme.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppTheme.spacingXl),
              // Order Number Input
              Text(
                loc.orderTrackingTitle,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              const SizedBox(height: AppTheme.spacingSm),
              TextFormField(
                controller: _orderNumberController,
                decoration: InputDecoration(
                  hintText: loc.orderTrackingHint,
                  prefixIcon: const Icon(Icons.receipt),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return loc.orderTrackingHint;
                  }
                  if (value.length < 4) {
                    return loc.orderTrackingNumberLength;
                  }
                  return null;
                },
              ),
              const SizedBox(height: AppTheme.spacingLg),
              // Track Button
              CustomButton(
                text: loc.orderTrackingButton,
                icon: Icons.search,
                isLoading: _isTracking,
                onPressed: _trackOrder,
              ),
              const SizedBox(height: AppTheme.spacingLg),
              // Help Section
              Container(
                padding: const EdgeInsets.all(AppTheme.spacingMd),
                decoration: BoxDecoration(
                  color: AppTheme.bgAccent,
                  borderRadius: BorderRadius.circular(AppTheme.borderRadius),
                  border: Border.all(color: AppTheme.primaryLight),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(
                          Icons.help_outline,
                          color: AppTheme.primaryColor,
                          size: 20,
                        ),
                        const SizedBox(width: AppTheme.spacingSm),
                        Text(
                          loc.needHelp,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            color: AppTheme.textPrimary,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppTheme.spacingSm),
                    Text(
                      loc.orderTrackingHelp,
                      style: const TextStyle(
                        fontSize: 14,
                        color: AppTheme.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
