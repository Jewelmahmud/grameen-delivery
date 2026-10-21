import 'package:flutter/material.dart';

class LanguageToggle extends StatelessWidget {
  final bool isBangla;
  final ValueChanged<bool> onToggle;

  const LanguageToggle({
    super.key,
    required this.isBangla,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onToggle(!isBangla),
      child: Container(
        margin: const EdgeInsets.only(right: 12),
        width: 76,
        height: 32,
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.2),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Colors.white.withOpacity(0.35),
            width: 1,
          ),
        ),
        child: Stack(
          children: [
            AnimatedAlign(
              alignment: isBangla ? Alignment.centerLeft : Alignment.centerRight,
              duration: const Duration(milliseconds: 250),
              child: Container(
                width: 36,
                height: 26,
                margin: const EdgeInsets.all(2),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(13),
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Center(
                    child: Text(
                      'বাং',
                      style: TextStyle(
                        color: isBangla ? Colors.black87 : Colors.white70,
                        fontSize: 12,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ),
                Expanded(
                  child: Center(
                    child: Text(
                      'EN',
                      style: TextStyle(
                        color: !isBangla ? Colors.black87 : Colors.white70,
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
