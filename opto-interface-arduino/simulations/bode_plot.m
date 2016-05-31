#
# Plot graph of sweep from 10Hz -> 100kHz magnitude and phase at the Arduino analogue input pin 

[data,colnames,s]=spice_readfile("analogue_filter_adc_frontend.ngspice.raw");

colnames_local = { 'frequency', 'v(4)' }
#colnames_local = { 'time', 'i(l1)' }

[tf, s_idx] = ismember(colnames_local, colnames);

plot_matrix(data(:,s_idx), colnames(s_idx,:), 'v(t) at Arduino input');

#plot_matrix(data(1:size(data,1)/16,s_idx), colnames(s_idx,:), 'v(t) inputs and i_l1(t) motor winding');

