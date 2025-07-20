import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    MenubarModule,
    ButtonModule,
    Menu,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  items: MenuItem[] | undefined;
  options: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        badge: '3',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            separator: true,
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U',
          },
        ],
      },
    ];

    this.options = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          console.log('Profile clicked');
        }
      },
      {        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          console.log('Settings clicked');
        }
      },
      {        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          console.log('Logout clicked');
        }
      },
    ];
  }
}
