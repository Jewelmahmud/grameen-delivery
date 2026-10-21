import 'package:flutter/material.dart';
import 'package:mobileapp_shared/mobileapp_shared.dart';

class CreateDeliveryScreen extends StatefulWidget {
  final ValueChanged<DeliveryModel> onDeliveryCreated;

  const CreateDeliveryScreen({
    super.key,
    required this.onDeliveryCreated,
  });

  @override
  State<CreateDeliveryScreen> createState() => _CreateDeliveryScreenState();
}

class _CreateDeliveryScreenState extends State<CreateDeliveryScreen> {
  final _formKey = GlobalKey<FormState>();
  final _recipientNameController = TextEditingController();
  final _recipientPhoneController = TextEditingController();
  final _deliveryAddressController = TextEditingController();
  final _itemDescriptionController = TextEditingController();
  final _amountController = TextEditingController();
  final _notesController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _recipientNameController.dispose();
    _recipientPhoneController.dispose();
    _deliveryAddressController.dispose();
    _itemDescriptionController.dispose();
    _amountController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      Future.delayed(const Duration(milliseconds: 700), () {
        if (!mounted) return;

        final newDelivery = DeliveryModel(
          id: 'DLV-${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}',
          deliveryNumber: 'GD-${DateTime.now().millisecondsSinceEpoch.toString().substring(5)}',
          orderId: 'ORD-${DateTime.now().millisecondsSinceEpoch.toString().substring(7)}',
          status: AppConstants.statusReady,
          merchantName: 'গ্রামীণ স্টোর (আমার ব্যবসা)',
          pickupAddress: 'মিরপুর-১০, ঢাকা',
          deliveryAddress: _deliveryAddressController.text.trim(),
          recipientName: _recipientNameController.text.trim(),
          recipientPhone: _recipientPhoneController.text.trim(),
          codAmount: double.tryParse(_amountController.text.trim()) ?? 0.0,
          riderEarning: 60.0,
          distanceKm: 3.2,
          createdAt: DateTime.now(),
        );

        widget.onDeliveryCreated(newDelivery);
        setState(() {
          _isLoading = false;
        });

        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('নতুন পার্সেল ডেলিভারি সফলভাবে যুক্ত হয়েছে!'),
            backgroundColor: AppTheme.statusSuccess,
          ),
        );
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const BrandHeader(
        title: 'নতুন ডেলিভারি যোগ করুন',
        subtitle: 'Grameen Delivery Merchant',
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppTheme.spacingLg),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'গ্রাহক ও ডেলিভারির তথ্য',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.textPrimary,
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'পার্সেলটি সঠিক গন্তব্যে পৌঁছানোর জন্য তথ্যগুলো পূরণ করুন।',
                style: TextStyle(fontSize: 13, color: AppTheme.textSecondary),
              ),
              const SizedBox(height: AppTheme.spacingLg),

              // Recipient Name
              TextFormField(
                controller: _recipientNameController,
                decoration: const InputDecoration(
                  labelText: 'গ্রাহকের নাম (Recipient Name)',
                  prefixIcon: Icon(Icons.person_outline, color: AppTheme.primaryColor),
                ),
                validator: (val) => val == null || val.isEmpty ? 'গ্রাহকের নাম লিখুন' : null,
              ),
              const SizedBox(height: AppTheme.spacingMd),

              // Recipient Phone
              TextFormField(
                controller: _recipientPhoneController,
                keyboardType: TextInputType.phone,
                decoration: const InputDecoration(
                  labelText: 'মোবাইল নম্বর (Phone Number)',
                  prefixIcon: Icon(Icons.phone_outlined, color: AppTheme.primaryColor),
                  hintText: '017XXXXXXXX',
                ),
                validator: (val) {
                  if (val == null || val.isEmpty) return 'মোবাইল নম্বর লিখুন';
                  if (val.length < 11) return 'সঠিক ১১ ডিজিটের নম্বর লিখুন';
                  return null;
                },
              ),
              const SizedBox(height: AppTheme.spacingMd),

              // Delivery Address
              TextFormField(
                controller: _deliveryAddressController,
                maxLines: 2,
                decoration: const InputDecoration(
                  labelText: 'সম্পূর্ণ ডেলিভারি ঠিকানা (Full Address)',
                  prefixIcon: Icon(Icons.location_on_outlined, color: AppTheme.primaryColor),
                ),
                validator: (val) => val == null || val.isEmpty ? 'ডেলিভারি ঠিকানা লিখুন' : null,
              ),
              const SizedBox(height: AppTheme.spacingMd),

              // Item / Parcel description
              TextFormField(
                controller: _itemDescriptionController,
                decoration: const InputDecoration(
                  labelText: 'পণ্যের বিবরণ (Item Name / Description)',
                  prefixIcon: Icon(Icons.inventory_2_outlined, color: AppTheme.primaryColor),
                ),
                validator: (val) => val == null || val.isEmpty ? 'পণ্যের বিবরণ লিখুন' : null,
              ),
              const SizedBox(height: AppTheme.spacingMd),

              // COD Amount
              TextFormField(
                controller: _amountController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'ক্যাশ অন ডেলিভারি (COD Amount - ৳)',
                  prefixIcon: Icon(Icons.attach_money, color: AppTheme.primaryColor),
                  hintText: '0 if already paid',
                ),
                validator: (val) => val == null || val.isEmpty ? 'টাকার পরিমাণ লিখুন' : null,
              ),
              const SizedBox(height: AppTheme.spacingMd),

              // Special Notes
              TextFormField(
                controller: _notesController,
                decoration: const InputDecoration(
                  labelText: 'বিশেষ নির্দেশনা (ঐচ্ছিক)',
                  prefixIcon: Icon(Icons.notes, color: AppTheme.primaryColor),
                ),
              ),
              const SizedBox(height: AppTheme.spacingXl),

              CustomButton(
                text: 'পার্সেল বুক করুন',
                icon: Icons.send,
                isLoading: _isLoading,
                onPressed: _submit,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
