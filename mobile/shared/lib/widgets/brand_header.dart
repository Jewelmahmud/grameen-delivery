import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class BrandHeader extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final String subtitle;
  final List<Widget>? actions;
  final Widget? leading;
  final bool showBackButton;

  const BrandHeader({
    super.key,
    required this.title,
    this.subtitle = 'Grameen Delivery',
    this.actions,
    this.leading,
    this.showBackButton = true,
  });

  @override
  Size get preferredSize => const Size.fromHeight(60.0);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      backgroundColor: AppTheme.primaryColor,
      elevation: 0,
      centerTitle: false,
      automaticallyImplyLeading: showBackButton,
      leading: leading,
      title: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 11,
              color: Colors.white.withOpacity(0.85),
              fontWeight: FontWeight.w400,
            ),
          ),
        ],
      ),
      actions: actions,
    );
  }
}
