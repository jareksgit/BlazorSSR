using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BlazorSSR.Client.Services;
using BlazorSSR.Client.States;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Web;
using MudBlazor;

namespace BlazorSSR.Client.Shared
{
    public partial class MainLayout : LayoutComponentBase
    {
        [Inject]
        private NavigationManager NavigationManager { get; set; }

        [Inject]
        private IDialogService DialogService { get; set; }

        [Inject]
        private IdentityAuthenticationStateProvider authStateProvider { get; set; }

        [Inject]
        private IApiLinkService ApiLinkService { get; set; }

        bool _drawerOpen = true;

        DialogOptions dialogMaxWidth = new DialogOptions() { MaxWidth = MaxWidth.Small, FullWidth = true };

        private void DrawerToggle()
        {
            _drawerOpen = !_drawerOpen;
        }

        private Task<IEnumerable<ApiLinkServiceEntry>> Search(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return Task.FromResult<IEnumerable<ApiLinkServiceEntry>>(Array.Empty<ApiLinkServiceEntry>());
            return ApiLinkService.Search(text);
        }

        private void OnSearchResult(ApiLinkServiceEntry entry)
        {
            NavigationManager.NavigateTo(entry.Link);
        }

        private void OpenLoginDialog(DialogOptions options)
        {
            DialogService.Show<LoginDialog>("Login Dialog", options);
        }

        private async Task BeginSignOut(MouseEventArgs args)
        {
            await authStateProvider.Logout();
            NavigationManager.NavigateTo("/");
        }
    }
}
