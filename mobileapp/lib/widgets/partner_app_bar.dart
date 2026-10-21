import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../l10n/app_localizations.dart';

class PartnerAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final VoidCallback? onMenuPressed;
  final VoidCallback? onProfilePressed;
  final VoidCallback? onSettingsPressed;
  final VoidCallback? onLogoutPressed;

  const PartnerAppBar({
    super.key,
    this.title = 'Partner',
    this.onMenuPressed,
    this.onProfilePressed,
    this.onSettingsPressed,
    this.onLogoutPressed,
  });

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final isBangla = Localizations.localeOf(context).languageCode == 'bn';

    return AppBar(
      title: Text(
        isBangla ? 'পার্টনার' : title,
        style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
      ),
      backgroundColor: AppTheme.primaryColor,
      foregroundColor: Colors.white,
      leading: IconButton(
        icon: const Icon(Icons.menu),
        onPressed:
            onMenuPressed ??
            () {
              ScaffoldMessenger.of(
                context,
              ).showSnackBar(SnackBar(content: Text(loc.adminMenuComingSoon)));
            },
      ),
      actions: [
        PopupMenuButton<String>(
          icon: const Icon(Icons.person),
          onSelected: (value) {
            switch (value) {
              case 'profile':
                onProfilePressed?.call();
                break;
              case 'settings':
                onSettingsPressed?.call();
                break;
              case 'logout':
                if (onLogoutPressed != null) {
                  onLogoutPressed!();
                } else {
                  Navigator.of(context).popUntil((route) => route.isFirst);
                }
                break;
            }
          },
          itemBuilder: (context) => [
            PopupMenuItem(
              value: 'profile',
              child: Row(
                children: [
                  const Icon(Icons.person, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    loc.partnerProfile,
                    style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
                  ),
                ],
              ),
            ),
            PopupMenuItem(
              value: 'settings',
              child: Row(
                children: [
                  const Icon(Icons.settings, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    loc.adminSettings,
                    style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
                  ),
                ],
              ),
            ),
            PopupMenuItem(
              value: 'logout',
              child: Row(
                children: [
                  const Icon(Icons.logout, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    loc.adminLogout,
                    style: TextStyle(fontFamily: isBangla ? 'Kalpurush' : null),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
