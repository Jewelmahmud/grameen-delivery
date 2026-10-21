import 'package:flutter/material.dart';
import 'package:mobileapp_shared/mobileapp_shared.dart';
import 'create_delivery_screen.dart';

class MerchantDashboard extends StatefulWidget {
  const MerchantDashboard({super.key});

  @override
  State<MerchantDashboard> createState() => _MerchantDashboardState();
}

class _MerchantDashboardState extends State<MerchantDashboard> {
  int _currentIndex = 0;
  bool _isBangla = true;

  // In-memory demo deliveries list
  final List<DeliveryModel> _deliveries = [
    DeliveryModel(
      id: 'DLV-101',
      deliveryNumber: 'GD-89211',
      orderId: 'ORD-701',
      status: AppConstants.statusReady,
      merchantName: 'গ্রামীণ টেক্সটাইল ও ফ্যাশন',
      pickupAddress: 'মিরপুর-১, ঢাকা',
      deliveryAddress: 'হাউজ ১২, রোড ৫, ধানমন্ডি, ঢাকা',
      recipientName: 'তানভীর আহমেদ',
      recipientPhone: '01812345678',
      codAmount: 1850.0,
      riderEarning: 70.0,
      distanceKm: 4.5,
      createdAt: DateTime.now().subtract(const Duration(minutes: 25)),
    ),
    DeliveryModel(
      id: 'DLV-102',
      deliveryNumber: 'GD-89212',
      orderId: 'ORD-702',
      status: AppConstants.statusInTransit,
      merchantName: 'গ্রামীণ টেক্সটাইল ও ফ্যাশন',
      pickupAddress: 'মিরপুর-১, ঢাকা',
      deliveryAddress: 'ব্লক-সি, বনানী, ঢাকা',
      recipientName: 'ফারহানা ইসলাম',
      recipientPhone: '01798765432',
      codAmount: 2400.0,
      riderEarning: 85.0,
      distanceKm: 7.2,
      createdAt: DateTime.now().subtract(const Duration(hours: 1, minutes: 10)),
    ),
    DeliveryModel(
      id: 'DLV-103',
      deliveryNumber: 'GD-89213',
      orderId: 'ORD-703',
      status: AppConstants.statusDelivered,
      merchantName: 'গ্রামীণ টেক্সটাইল ও ফ্যাশন',
      pickupAddress: 'মিরপুর-১, ঢাকা',
      deliveryAddress: 'উত্তরা সেক্টর ৭, ঢাকা',
      recipientName: 'মোহাম্মদ রফিক',
      recipientPhone: '01911223344',
      codAmount: 950.0,
      riderEarning: 60.0,
      distanceKm: 5.1,
      createdAt: DateTime.now().subtract(const Duration(hours: 3)),
    ),
  ];

  void _addDelivery(DeliveryModel delivery) {
    setState(() {
      _deliveries.insert(0, delivery);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: BrandHeader(
        title: _isBangla ? 'মার্চেন্ট ড্যাশবোর্ড' : 'Merchant Dashboard',
        subtitle: _isBangla ? 'গ্রামীণ টেক্সটাইল ও ফ্যাশন' : 'Grameen Textile & Fashion',
        showBackButton: false,
        actions: [
          LanguageToggle(
            isBangla: _isBangla,
            onToggle: (val) => setState(() => _isBangla = val),
          ),
          IconButton(
            icon: const Icon(Icons.notifications_outlined, color: Colors.white),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('নতুন কোনো নোটিফিকেশন নেই')),
              );
            },
          ),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: [
          _buildOverviewTab(),
          _buildDeliveriesTab(),
          _buildReportsTab(),
          _buildProfileTab(),
        ],
      ),
      floatingActionButton: _currentIndex == 0 || _currentIndex == 1
          ? FloatingActionButton.extended(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => CreateDeliveryScreen(
                      onDeliveryCreated: _addDelivery,
                    ),
                  ),
                );
              },
              backgroundColor: AppTheme.primaryColor,
              foregroundColor: Colors.white,
              icon: const Icon(Icons.add),
              label: Text(_isBangla ? 'নতুন পার্সেল' : 'New Parcel'),
            )
          : null,
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        selectedItemColor: AppTheme.primaryColor,
        unselectedItemColor: AppTheme.textSecondary,
        items: [
          BottomNavigationBarItem(
            icon: const Icon(Icons.dashboard_outlined),
            activeIcon: const Icon(Icons.dashboard),
            label: _isBangla ? 'ওভারভিউ' : 'Overview',
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.local_shipping_outlined),
            activeIcon: const Icon(Icons.local_shipping),
            label: _isBangla ? 'ডেলিভারি' : 'Deliveries',
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.bar_chart_outlined),
            activeIcon: const Icon(Icons.bar_chart),
            label: _isBangla ? 'রিপোর্ট' : 'Reports',
          ),
          BottomNavigationBarItem(
            icon: const Icon(Icons.storefront_outlined),
            activeIcon: const Icon(Icons.storefront),
            label: _isBangla ? 'স্টোর প্রোফাইল' : 'Store Profile',
          ),
        ],
      ),
    );
  }

  // -------------------------------------------------------------
  // TAB 1: OVERVIEW
  // -------------------------------------------------------------
  Widget _buildOverviewTab() {
    final readyCount = _deliveries.where((d) => d.status == AppConstants.statusReady).length;
    final inTransitCount = _deliveries.where((d) => d.status == AppConstants.statusInTransit).length;
    // deliveredCount
    final totalCod = _deliveries.fold<double>(0.0, (sum, d) => sum + d.codAmount);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppTheme.spacingMd),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Store Status Banner
          Container(
            padding: const EdgeInsets.all(AppTheme.spacingMd),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.primaryColor.withOpacity(0.9),
                  AppTheme.primaryDark,
                ],
              ),
              borderRadius: BorderRadius.circular(AppTheme.borderRadius),
            ),
            child: Row(
              children: [
                const CircleAvatar(
                  radius: 24,
                  backgroundColor: Colors.white,
                  child: Icon(Icons.store, color: AppTheme.primaryColor, size: 28),
                ),
                const SizedBox(width: AppTheme.spacingMd),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        _isBangla ? 'গ্রামীণ টেক্সটাইল ও ফ্যাশন' : 'Grameen Textile & Fashion',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: [
                          Container(
                            width: 8,
                            height: 8,
                            decoration: const BoxDecoration(
                              color: Colors.lightGreenAccent,
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            _isBangla ? 'ভেরিফায়েড মার্চেন্ট অ্যাকাউন্ট' : 'Verified Merchant Account',
                            style: TextStyle(
                              color: Colors.white.withOpacity(0.9),
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppTheme.spacingLg),

          // Quick Metric Cards
          Text(
            _isBangla ? 'আজকের সার্বিক চিত্র' : "Today's Summary",
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
          const SizedBox(height: AppTheme.spacingSm),

          Row(
            children: [
              Expanded(
                child: InfoCard(
                  title: _isBangla ? 'মোট পার্সেল' : 'Total Parcels',
                  value: '${_deliveries.length}',
                  icon: Icons.inventory_2,
                  iconColor: AppTheme.primaryColor,
                ),
              ),
              const SizedBox(width: AppTheme.spacingSm),
              Expanded(
                child: InfoCard(
                  title: _isBangla ? 'পথে রয়েছে' : 'In Transit',
                  value: '$inTransitCount',
                  icon: Icons.moped,
                  iconColor: AppTheme.statusWarning,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingSm),

          Row(
            children: [
              Expanded(
                child: InfoCard(
                  title: _isBangla ? 'পিকআপের অপেক্ষায়' : 'Ready for Pickup',
                  value: '$readyCount',
                  icon: Icons.access_time_filled,
                  iconColor: AppTheme.accentColor,
                ),
              ),
              const SizedBox(width: AppTheme.spacingSm),
              Expanded(
                child: InfoCard(
                  title: _isBangla ? 'মোট COD পরিমাণ' : 'Total COD',
                  value: AppConstants.formatCurrency(totalCod),
                  icon: Icons.payments,
                  iconColor: AppTheme.statusSuccess,
                ),
              ),
            ],
          ),
          const SizedBox(height: AppTheme.spacingLg),

          // Recent Dispatches Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                _isBangla ? 'সাম্প্রতিক পার্সেল তালিকা' : 'Recent Dispatches',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.textPrimary,
                ),
              ),
              TextButton(
                onPressed: () => setState(() => _currentIndex = 1),
                child: Text(_isBangla ? 'সব দেখুন' : 'View All'),
              ),
            ],
          ),

          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _deliveries.take(3).length,
            itemBuilder: (context, index) {
              final d = _deliveries[index];
              return _buildDeliveryCard(d);
            },
          ),
          const SizedBox(height: 70), // Spacing for FAB
        ],
      ),
    );
  }

  // -------------------------------------------------------------
  // TAB 2: DELIVERIES
  // -------------------------------------------------------------
  Widget _buildDeliveriesTab() {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(AppTheme.spacingMd),
          color: AppTheme.bgSecondary,
          child: Row(
            children: [
              const Icon(Icons.filter_list, color: AppTheme.primaryColor),
              const SizedBox(width: AppTheme.spacingSm),
              Text(
                _isBangla ? 'সকল সক্রিয় ও সম্পন্ন ডেলিভারি' : 'All Deliveries & Shipments',
                style: const TextStyle(
                  fontWeight: FontWeight.w600,
                  color: AppTheme.textPrimary,
                ),
              ),
              const Spacer(),
              Text(
                '${_deliveries.length} ${_isBangla ? 'টি পার্সেল' : 'Items'}',
                style: const TextStyle(
                  fontSize: 12,
                  color: AppTheme.textSecondary,
                ),
              ),
            ],
          ),
        ),
        Expanded(
          child: _deliveries.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.inbox, size: 60, color: AppTheme.textTertiary),
                      const SizedBox(height: AppTheme.spacingMd),
                      Text(
                        _isBangla ? 'কোনো পার্সেল পাওয়া যায়নি' : 'No parcels found',
                        style: const TextStyle(color: AppTheme.textSecondary),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  padding: const EdgeInsets.only(top: AppTheme.spacingSm, bottom: 80),
                  itemCount: _deliveries.length,
                  itemBuilder: (context, index) {
                    return _buildDeliveryCard(_deliveries[index]);
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildDeliveryCard(DeliveryModel d) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppTheme.spacingMd),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  d.deliveryNumber,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                    color: AppTheme.primaryColor,
                  ),
                ),
                StatusBadge(status: d.status, isBangla: _isBangla),
              ],
            ),
            const Divider(height: 18),
            Row(
              children: [
                const Icon(Icons.person, size: 16, color: AppTheme.textSecondary),
                const SizedBox(width: 6),
                Text(
                  d.recipientName,
                  style: const TextStyle(fontWeight: FontWeight.w600),
                ),
                const Spacer(),
                const Icon(Icons.phone, size: 15, color: AppTheme.textSecondary),
                const SizedBox(width: 4),
                Text(
                  d.recipientPhone,
                  style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
                ),
              ],
            ),
            const SizedBox(height: 6),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.location_on_outlined, size: 16, color: AppTheme.textSecondary),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    d.deliveryAddress,
                    style: const TextStyle(fontSize: 13, color: AppTheme.textSecondary),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${_isBangla ? 'ক্যাশ অন ডেলিভারি:' : 'COD Amount:'} ${AppConstants.formatCurrency(d.codAmount)}',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                    color: AppTheme.textPrimary,
                  ),
                ),
                Text(
                  '${d.distanceKm} km',
                  style: const TextStyle(fontSize: 12, color: AppTheme.textTertiary),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // TAB 3: REPORTS
  // -------------------------------------------------------------
  Widget _buildReportsTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppTheme.spacingMd),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            _isBangla ? 'পেমেন্ট ও সেটেলমেন্ট রিপোর্ট' : 'Settlement & Payment Reports',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            _isBangla ? 'আপনার দোকানের সংগৃহীত ক্যাশ ও ট্রান্সফার হিসাব' : 'Your collected cash and bank payout records',
            style: const TextStyle(fontSize: 13, color: AppTheme.textSecondary),
          ),
          const SizedBox(height: AppTheme.spacingLg),

          Container(
            padding: const EdgeInsets.all(AppTheme.spacingLg),
            decoration: BoxDecoration(
              color: AppTheme.bgAccent,
              borderRadius: BorderRadius.circular(AppTheme.borderRadius),
              border: Border.all(color: AppTheme.primaryLight),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _isBangla ? 'পরবর্তী পে-আউট ব্যালেন্স' : 'Pending Settlement Balance',
                  style: const TextStyle(fontSize: 13, color: AppTheme.textSecondary),
                ),
                const SizedBox(height: 4),
                Text(
                  AppConstants.formatCurrency(5200.0),
                  style: const TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.primaryDark,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  _isBangla ? 'প্রতি মঙ্গলবার ও শুক্রবার সরাসরি ব্যাংকে জমা হয়।' : 'Transferred every Tuesday and Friday to bank.',
                  style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppTheme.spacingLg),

          Text(
            _isBangla ? 'সাম্প্রতিক পে-আউট লেনদেন' : 'Recent Payout History',
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppTheme.textPrimary,
            ),
          ),
          const SizedBox(height: AppTheme.spacingSm),

          _buildPayoutRow('TRX-9941', '১৬ অক্টোবর ২০২৬', 8450.0, 'সফল'),
          _buildPayoutRow('TRX-9820', '১২ অক্টোবর ২০২৬', 12300.0, 'সফল'),
          _buildPayoutRow('TRX-9705', '০৮ অক্টোবর ২০২৬', 6120.0, 'সফল'),
        ],
      ),
    );
  }

  Widget _buildPayoutRow(String id, String date, double amount, String status) {
    return Card(
      child: ListTile(
        leading: const CircleAvatar(
          backgroundColor: AppTheme.bgAccent,
          child: Icon(Icons.account_balance, color: AppTheme.primaryColor),
        ),
        title: Text(AppConstants.formatCurrency(amount), style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text('$id • $date', style: const TextStyle(fontSize: 12)),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: AppTheme.statusSuccess.withOpacity(0.12),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            status,
            style: const TextStyle(
              color: AppTheme.statusSuccess,
              fontSize: 11,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }

  // -------------------------------------------------------------
  // TAB 4: STORE PROFILE
  // -------------------------------------------------------------
  Widget _buildProfileTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppTheme.spacingMd),
      child: Column(
        children: [
          const SizedBox(height: AppTheme.spacingSm),
          const CircleAvatar(
            radius: 40,
            backgroundColor: AppTheme.bgAccent,
            child: Icon(Icons.storefront, size: 45, color: AppTheme.primaryColor),
          ),
          const SizedBox(height: AppTheme.spacingSm),
          Text(
            _isBangla ? 'গ্রামীণ টেক্সটাইল ও ফ্যাশন' : 'Grameen Textile & Fashion',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const Text(
            'partner-id: PRT-2026-DHAKA',
            style: TextStyle(fontSize: 12, color: AppTheme.textSecondary),
          ),
          const SizedBox(height: AppTheme.spacingLg),

          Card(
            child: Column(
              children: [
                ListTile(
                  leading: const Icon(Icons.phone, color: AppTheme.primaryColor),
                  title: Text(_isBangla ? 'যোগাযোগ নম্বর' : 'Phone Number'),
                  subtitle: const Text('+880 1712-345678'),
                ),
                const Divider(height: 1),
                ListTile(
                  leading: const Icon(Icons.location_on, color: AppTheme.primaryColor),
                  title: Text(_isBangla ? 'পিকআপ ঠিকানা' : 'Pickup Hub Address'),
                  subtitle: const Text('মিরপুর-১, মেইন রোড, ঢাকা-১২১৬'),
                ),
                const Divider(height: 1),
                ListTile(
                  leading: const Icon(Icons.verified, color: AppTheme.primaryColor),
                  title: Text(_isBangla ? 'ভেরিফিকেশন স্ট্যাটাস' : 'Verification Status'),
                  subtitle: Text(_isBangla ? 'অনুমোদিত ও সক্রিয়' : 'Verified & Active'),
                ),
              ],
            ),
          ),
          const SizedBox(height: AppTheme.spacingLg),

          CustomButton(
            text: _isBangla ? 'লগআউট' : 'Logout',
            icon: Icons.logout,
            isOutlined: true,
            backgroundColor: AppTheme.statusError,
            textColor: AppTheme.statusError,
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ],
      ),
    );
  }
}
